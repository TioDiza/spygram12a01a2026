import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, MoreHorizontal, ChevronDown, Plus } from 'lucide-react';
import { ProfileData, SuggestedProfile, FeedPost } from '../../types';

// Helper function to mask usernames
const maskUsername = (username: string) => {
  if (username.length <= 4) return username; // Não mascara nomes curtos (como os gerados)
  if (username.length <= 3) return '*******';
  return `${username.substring(0, 3).toLowerCase()}****`;
};

interface ClickableProps {
  onLockedFeatureClick: (featureName: string) => void;
}

const InstagramHeader: React.FC<ClickableProps> = ({ onLockedFeatureClick }) => (
  <header className="grid grid-cols-3 items-center px-4 py-2 border-b border-gray-800 bg-black sticky top-0 z-10 md:hidden">
    <button onClick={() => onLockedFeatureClick('criar uma publicação')} className="flex justify-start">
      <img src="/icons/add-content.png" alt="Criar" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
    </button>
    <div onClick={() => onLockedFeatureClick('trocar de conta')} className="flex justify-center items-center gap-1 cursor-pointer">
      <img src="/instagram-logo.png" alt="Instagram Logo" className="h-8" style={{ filter: 'invert(1)' }} />
      <ChevronDown className="w-5 h-5 text-white mt-1" />
    </div>
    <button onClick={() => onLockedFeatureClick('ver as notificações')} className="flex justify-end">
      <img src="/icons/heart.png" alt="Notificações" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
    </button>
  </header>
);

const InstagramFooter: React.FC<{ profileData: ProfileData } & ClickableProps> = ({ profileData, onLockedFeatureClick }) => {
  const navigate = useNavigate();
  return (
    <footer className="flex justify-around items-center py-3 border-t border-gray-800 bg-black sticky bottom-0 z-10 md:hidden">
      <button onClick={() => onLockedFeatureClick('acessar a página inicial')}>
        <img src="/icons/home.png" alt="Página Inicial" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => onLockedFeatureClick('fazer uma pesquisa')}>
        <img src="/icons/search.png" alt="Pesquisa" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => onLockedFeatureClick('ver os Reels')}>
        <img src="/icons/reels.png" alt="Reels" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
      </button>
      <button onClick={() => navigate('/messages')} className="relative">
        <img src="/icons/send.png" alt="Mensagens" className="w-7 h-7" style={{ filter: 'brightness(0) invert(1)' }} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-black"></div>
      </button>
      <button onClick={() => onLockedFeatureClick('ver o seu perfil')}>
        <img src={profileData.profilePicUrl} alt={profileData.username} className="w-7 h-7 rounded-full object-cover" />
      </button>
    </footer>
  );
};

const RealPost: React.FC<{ postData: FeedPost; location?: string } & ClickableProps> = ({ postData, location, onLockedFeatureClick }) => {
  const { de_usuario, post } = postData;
  const maskedUsername = maskUsername(de_usuario.username);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like_count);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(prev => !prev);
  };

  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div onClick={() => onLockedFeatureClick(`ver o perfil de @${de_usuario.username}`)} className="flex items-center space-x-3 cursor-pointer">
          <img src={de_usuario.profile_pic_url} alt={de_usuario.username} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{maskedUsername}</p>
            {location && <p className="text-xs text-gray-400">{location}</p>}
          </div>
        </div>
        <button onClick={() => onLockedFeatureClick('ver as opções da publicação')}><MoreHorizontal className="w-5 h-5 text-white" /></button>
      </div>
      
      {post.is_video && post.video_url ? (
        <video 
          src={post.video_url} 
          poster={post.image_url}
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-auto object-contain bg-black"
        ></video>
      ) : (
        <img src={post.image_url} alt="Post" className="w-full h-auto object-contain" />
      )}

      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <button onClick={handleLike}>
            <img 
              src={isLiked ? "/icons/heart-liked.png" : "/icons/heart.png"} 
              alt="Curtir" 
              className="w-6 h-6" 
              style={isLiked ? {} : { filter: 'brightness(0) invert(1)' }} 
            />
          </button>
          <button onClick={() => onLockedFeatureClick('ver os comentários')}>
            <img src="/icons/comment.png" alt="Comentar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
          <button onClick={() => navigate('/messages')}>
            <img src="/icons/send.png" alt="Enviar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          </button>
        </div>
        <button onClick={() => onLockedFeatureClick('salvar publicações')}>
          <img src="/icons/bookmark.png" alt="Salvar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
        </button>
      </div>
      <div className="px-3 pb-3 text-xs">
        <p onClick={() => onLockedFeatureClick('ver as curtidas')} className="font-semibold text-white mb-1 cursor-pointer">{new Intl.NumberFormat().format(likeCount)} curtidas</p>
        {post.caption && (
          <p className="text-white"><span className="font-semibold mr-1">{maskedUsername}</span><span>{post.caption}</span></p>
        )}
        <p onClick={() => onLockedFeatureClick('ver os comentários')} className="text-gray-500 mt-1 cursor-pointer">Ver todos os {post.comment_count} comentários</p>
      </div>
    </div>
  );
};

const LockedPost: React.FC<{ location?: string }> = ({ location }) => {
  return (
    <div className="border-b border-gray-800 mb-4">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          <div>
            <p className="text-sm font-semibold text-white bg-gray-700 rounded w-20 h-4"></p>
            {location && <p className="text-xs text-gray-400 mt-1">{location}</p>}
          </div>
        </div>
        <MoreHorizontal className="w-5 h-5 text-white" />
      </div>
      <div className="relative w-full bg-gray-900 flex items-center justify-center aspect-square">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <Lock className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
          <p className="text-xl font-bold text-white">CONTEÚDO BLOQUEADO</p>
          <p className="text-sm text-gray-400 mt-1">Acesso Premium Requerido</p>
        </div>
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex space-x-4">
          <img src="/icons/heart.png" alt="Curtir" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="/icons/comment.png" alt="Comentar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <img src="/icons/send.png" alt="Enviar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
        <img src="/icons/bookmark.png" alt="Salvar" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
      </div>
      <div className="px-3 pb-3 text-xs space-y-1 blur-sm select-none pointer-events-none">
        <p className="font-semibold text-white mb-1">1,234 curtidas</p>
        <p className="text-white"><span className="font-semibold mr-1">username</span><span>Lorem ipsum dolor sit amet, consectetur...</span></p>
        <p className="text-gray-500 mt-1">Ver todos os 56 comentários</p>
      </div>
    </div>
  );
};

interface InstagramFeedContentProps extends ClickableProps {
  profileData: ProfileData;
  suggestedProfiles: SuggestedProfile[];
  posts: FeedPost[];
  locations: string[];
}

const InstagramFeedContent: React.FC<InstagramFeedContentProps> = ({ profileData, suggestedProfiles, posts, locations, onLockedFeatureClick }) => {
  const hasRealPosts = posts && posts.length > 0;

  return (
    <>
      <InstagramHeader onLockedFeatureClick={onLockedFeatureClick} />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex p-3 space-x-4 border-b border-gray-800 overflow-x-auto flex-shrink-0 scrollbar-hide">
          <div onClick={() => onLockedFeatureClick('criar um story')} className="flex flex-col items-center flex-shrink-0 space-y-1 cursor-pointer">
            <div className="relative"><img src={profileData.profilePicUrl} alt="Seu story" className="w-16 h-16 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center"><Plus className="w-4 h-4 text-white" /></div>
            </div><span className="text-xs text-gray-400">Seu story</span>
          </div>
          {suggestedProfiles.map((story, index) => {
            const isCloseFriend = index < 3;
            const ringClasses = isCloseFriend
              ? 'bg-green-500'
              : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600';

            return (
              <div key={index} onClick={() => onLockedFeatureClick(`ver os stories de @${story.username}`)} className="flex flex-col items-center flex-shrink-0 space-y-1 text-center relative cursor-pointer">
                <div className={`w-[70px] h-[70px] rounded-full flex items-center justify-center p-0.5 ${ringClasses}`}>
                  <div className="bg-black p-1 rounded-full"><img src={story.profile_pic_url} alt={story.username} className="w-full h-full rounded-full object-cover" /></div>
                </div><span className="text-xs text-white mt-1 truncate w-16">{maskUsername(story.username)}</span>
              </div>
            );
          })}
        </div>
        
        {hasRealPosts ? posts.map((post, index) => (
          <RealPost key={post.post.id || index} postData={post} location={locations.length > 0 ? locations[index % locations.length] : undefined} onLockedFeatureClick={onLockedFeatureClick} />
        )) : [1, 2, 3].map((item, index) => (
          <LockedPost key={item} location={locations.length > 0 ? locations[index % locations.length] : undefined} />
        ))}

        <div className="text-center p-4 text-gray-500 text-sm">Fim do feed por enquanto.</div>
      </div>
      <InstagramFooter profileData={profileData} onLockedFeatureClick={onLockedFeatureClick} />
    </>
  );
};

export default InstagramFeedContent;