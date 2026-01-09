export interface ProfileData {
  username: string;
  fullName: string;
  profilePicUrl: string;
  biography?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface SuggestedProfile {
  username: string;
  profile_pic_url: string;
  fullName?: string;
  is_private?: boolean;
}

// Novo: Define a estrutura do usuário que fez o post
export interface PostUser {
  username: string;
  full_name: string;
  profile_pic_url: string;
}

// Novo: Define a estrutura de um post individual
export interface Post {
  id: string;
  image_url: string;
  video_url?: string;
  is_video: boolean;
  caption: string;
  like_count: number;
  comment_count: number;
}

// Novo: Define a estrutura completa de um item do feed
export interface FeedPost {
  de_usuario: PostUser;
  post: Post;
}

// Atualizado: O resultado da busca agora pode incluir os posts
export interface FetchResult {
  profile: ProfileData;
  suggestions: SuggestedProfile[];
  posts: FeedPost[];
}