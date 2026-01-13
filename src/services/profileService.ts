import type { ProfileData, SuggestedProfile, FetchResult, FeedPost, PostUser, Post } from '../../types';
import { supabase } from '../integrations/supabase/client';

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Proxy de imagens para evitar CORS, se ainda não tiver proxy.
 */
const getProxyImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/foto-bloqueada.png';
    // Se for uma URL local, data URI ou já estiver com proxy, retorna como está.
    if (imageUrl.startsWith('/') || imageUrl.startsWith('data:') || imageUrl.includes('workers.dev') || imageUrl.includes('weserv.nl')) {
        return imageUrl;
    }
    return `https://proxt-insta.projetinho-solo.workers.dev/?url=${encodeURIComponent(imageUrl)}`;
};

/**
 * Proxy de imagens leve para avatares, se ainda não tiver proxy.
 */
const getProxyImageUrlLight = (imageUrl: string | undefined): string => {
    if (!imageUrl || imageUrl.trim() === '') return '/foto-bloqueada.png';
    // Se for uma URL local, data URI ou já estiver com proxy, retorna como está.
    if (imageUrl.startsWith('/') || imageUrl.startsWith('data:') || imageUrl.includes('workers.dev') || imageUrl.includes('weserv.nl')) {
        return imageUrl;
    }
    const urlWithoutProtocol = imageUrl.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=80&h=80&fit=cover&q=50`;
};

/**
 * Invokes the Supabase Edge Function which acts as a secure proxy.
 */
const simpleFetch = async (campo: string, username: string): Promise<any> => {
    const { data, error } = await supabase.functions.invoke('proxy-api', {
        body: { campo, username },
    });

    if (error) {
        console.error('Supabase function invocation error:', error);
        throw new Error(`Erro ao contatar o servidor seguro: ${error.message}`);
    }
    
    // The data returned from the function might have an error property from the proxy itself
    if (data.error) {
        console.error('Proxy function returned an error:', data.error);
        throw new Error(`Erro no servidor seguro: ${data.error}`);
    }

    // The data from the external API might also have an error
    if (data.status === 'fail' || data.error) {
        throw new Error(data.message || data.error || 'A API externa retornou um erro.');
    }

    return data;
};


// ===================================
// EXPORTED FUNCTIONS
// ===================================

/**
 * Busca o perfil básico de um usuário para a tela de confirmação.
 */
export async function fetchProfileData(username: string): Promise<FetchResult> {
    try {
        const cleanUsername = username.replace(/^@+/, '').trim();
        if (!cleanUsername) throw new Error('Username inválido');

        console.log('🔍 Buscando perfil via proxy seguro:', cleanUsername);
        
        const response = await simpleFetch('perfil_completo', cleanUsername);

        // Acessa os dados aninhados
        const data = response?.results?.[0]?.data;

        if (data && data.username) {
            const profile: ProfileData = {
                username: data.username,
                fullName: data.full_name || '',
                profilePicUrl: getProxyImageUrl(data.profile_pic_url),
                biography: data.biography || '',
                followers: data.follower_count || 0,
                following: data.following_count || 0,
                postsCount: data.media_count || 0,
                isVerified: data.is_verified || false,
                isPrivate: data.is_private || false,
            };
            return { profile, suggestions: [], posts: [] };
        }
        throw new Error('Perfil não encontrado. Verifique o nome de usuário.');
    } catch (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        if (error instanceof Error) throw error;
        throw new Error('Ocorreu um erro desconhecido ao buscar dados do backend.');
    }
}

/**
 * Busca os dados completos para a simulação: perfis sugeridos e o post mais recente dos perfis públicos sugeridos.
 */
export async function fetchFullInvasionData(profileData: ProfileData): Promise<{ suggestions: SuggestedProfile[], posts: FeedPost[] }> {
    const cleanUsername = profileData.username.replace(/^@+/, '').trim();
    
    try {
        console.log('🔎 Buscando dados de invasão via proxy seguro:', cleanUsername);

        // 1. Fetch suggested profiles
        const suggestionsResponse = await simpleFetch('perfis_sugeridos', cleanUsername).catch(e => { 
            console.error("Falha ao buscar sugestões:", e); 
            return null; 
        });

        // 2. Process suggestions
        let suggestions: SuggestedProfile[] = [];
        const suggestionsData = suggestionsResponse?.results?.[0]?.data;
        if (Array.isArray(suggestionsData)) {
            suggestions = suggestionsData.map((p: any) => ({
                username: p.username || '',
                fullName: p.full_name || p.username,
                profile_pic_url: getProxyImageUrlLight(p.profile_pic_url),
                is_private: p.is_private,
            }));
        }

        // 3. Filter for public profiles
        const publicProfiles = suggestions.filter(p => p.is_private === false);
        console.log(`Encontrados ${publicProfiles.length} perfis públicos para buscar posts.`);

        // 4. Fetch the most recent post for each public profile in parallel
        const postPromises = publicProfiles.map(async (profile) => {
            try {
                const postsResponse = await simpleFetch('lista_posts', profile.username);
                const postsData = postsResponse?.results?.[0]?.data;
                
                // Pega apenas o primeiro post (o mais recente) se houver algum
                if (Array.isArray(postsData) && postsData.length > 0) {
                    const item = postsData[0]; 

                    const postUser: PostUser = {
                        username: profile.username,
                        full_name: profile.fullName || profile.username,
                        profile_pic_url: profile.profile_pic_url,
                    };

                    // Mapeia os dados do post com base na nova estrutura da API
                    const post: Post = {
                        id: item.id || String(Math.random()),
                        image_url: getProxyImageUrl(item.image_url),
                        video_url: item.video_url ? getProxyImageUrl(item.video_url) : undefined,
                        is_video: !!item.video_url,
                        caption: item.caption || '',
                        like_count: item.like_count || 0,
                        comment_count: item.comment_count || 0,
                    };
                    
                    // Retorna um único objeto FeedPost em um array para ser achatado depois
                    return [{ de_usuario: postUser, post }];
                }
                return []; // Nenhum post encontrado para este usuário
            } catch (error) {
                console.error(`Falha ao buscar posts para ${profile.username}:`, error);
                return []; // Retorna array vazio em caso de erro para este usuário
            }
        });

        // 5. Aguarda todas as buscas e achata o resultado
        const postsByProfile = await Promise.all(postPromises);
        const allPosts = postsByProfile.flat();

        // Embaralha os posts para misturar o feed
        const shuffledPosts = allPosts.sort(() => Math.random() - 0.5);

        console.log(`✅ Dados completos carregados. Sugestões: ${suggestions.length}, Posts: ${shuffledPosts.length}`);
        
        return { suggestions, posts: shuffledPosts };

    } catch (error) {
        console.error('❌ Erro ao buscar dados completos:', error);
        return { suggestions: [], posts: [] };
    }
}