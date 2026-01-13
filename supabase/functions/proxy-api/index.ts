import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Detalhes da nova API do exemplo cURL
const RAPIDAPI_HOST = 'instagram120.p.rapidapi.com';
const RAPIDAPI_BASE_URL = `https://${RAPIDAPI_HOST}`;

// Detalhes da API antiga do código existente
const OLD_API_BASE_URL = 'https://spypanel.shop';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const API_SECRET_KEY = Deno.env.get('API_SECRET_KEY')
    if (!API_SECRET_KEY) {
      throw new Error('API_SECRET_KEY não está configurada nos segredos do Supabase.')
    }

    const { campo, username } = await req.json()
    if (!campo || !username) {
      return new Response(
        JSON.stringify({ error: 'Faltando "campo" ou "username" no corpo da requisição.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    let targetUrl = '';
    let requestOptions: RequestInit = {};
    let isProfileApi = false;
    let isUserInfoApi = false;

    if (campo === 'perfil_completo') {
      // Usa a nova RapidAPI para buscar perfis
      isProfileApi = true;
      targetUrl = `${RAPIDAPI_BASE_URL}/api/instagram/profile`;
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': API_SECRET_KEY,
        },
        body: JSON.stringify({ username }),
      };
    } else if (campo === 'perfis_sugeridos') {
      // Usa a nova RapidAPI para buscar perfis sugeridos (userInfo)
      isUserInfoApi = true;
      targetUrl = `${RAPIDAPI_BASE_URL}/api/instagram/userInfo`;
      requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-host': RAPIDAPI_HOST,
          'x-rapidapi-key': API_SECRET_KEY,
        },
        body: JSON.stringify({ username }),
      };
    } else {
      // Usa a API antiga para outras requisições (posts)
      targetUrl = `${OLD_API_BASE_URL}/api/field?campo=${encodeURIComponent(campo)}&username=${encodeURIComponent(username)}&secret=${API_SECRET_KEY}`;
      requestOptions = {
        headers: { 'Accept': 'application/json' }
      };
    }

    const response = await fetch(targetUrl, requestOptions);

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Erro na API externa: ${response.status} ${response.statusText}`, errorBody);
        throw new Error(`Erro na API externa: ${response.status} ${response.statusText}`)
    }

    let data = await response.json();

    // Normaliza a estrutura de dados para corresponder ao formato da API antiga
    if (isProfileApi && data.result) {
      const profile = data.result;
      data = {
        results: [
          {
            data: {
              username: profile.username,
              full_name: profile.full_name,
              profile_pic_url: profile.profile_pic_url,
              biography: profile.biography,
              follower_count: profile.edge_followed_by?.count || 0,
              following_count: profile.edge_follow?.count || 0,
              media_count: profile.edge_owner_to_timeline_media?.count || 0,
              is_verified: profile.is_verified || false,
              is_private: profile.is_private || false,
            }
          }
        ]
      };
    } else if (isUserInfoApi && data.result && Array.isArray(data.result) && data.result.length > 0) {
      // A resposta de userInfo é um array, pegamos o primeiro item.
      // 'chaining_results' contém os perfis sugeridos.
      const suggestions = data.result[0].chaining_results || [];
      data = {
        results: [
          {
            data: suggestions
          }
        ]
      };
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Erro na função de proxy:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})