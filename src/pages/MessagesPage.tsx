import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, SquarePen } from 'lucide-react';
import SmileyStarIcon from '../components/icons/SmileyStarIcon';
import MetaAIIcon from '../components/icons/MetaAIIcon';
import DirectStoryItem from '../components/DirectStoryItem';
import MessageItem from '../components/MessageItem';
import './MessagesPage.css';
import { ProfileData, SuggestedProfile } from '../../types';
import { getCitiesByState } from '../services/geolocationService'; // Importa a função de cidades

// Interfaces para os dados da página
export interface Story {
  id: string;
  name: string;
  note: string;
  avatar: string;
}

export interface Message {
  id: string;
  name: string;
  message: string;
  time: string;
  unread: boolean;
  locked: boolean;
  avatar: string;
}

// Helper function to mask usernames
const maskUsername = (username: string) => {
  if (username.length <= 4) return username;
  return `${username.substring(0, 3).toLowerCase()}****`;
};

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);

      const suggestedProfiles: SuggestedProfile[] = data.suggestedProfiles || [];
      const userCity: string = data.userCity || 'São Paulo';
      
      // Gera uma lista de cidades para usar nas mensagens bloqueadas
      const allCities = getCitiesByState(userCity, 'São Paulo'); // Usando SP como fallback de estado
      
      // 1. Cria Stories (usando os primeiros 4 perfis sugeridos)
      const suggestedStories: Story[] = suggestedProfiles.slice(0, 4).map((profile: SuggestedProfile, index: number) => ({
        id: profile.username,
        name: maskUsername(profile.username),
        note: ['Preguiça Hoje 🥱🥱', 'Coração Partido (Ao Vivo)', 'O vontde fudê a 3 😈', '📍💦 São Paulo'][index % 4],
        avatar: profile.profile_pic_url,
      }));
      setStories(suggestedStories);

      // 2. Cria Mensagens (usando até 10 perfis sugeridos)
      const suggestedMessages: Message[] = suggestedProfiles.slice(0, 10).map((profile: SuggestedProfile, index: number) => {
        const isLocked = index >= 2; // Os dois primeiros chats são desbloqueados
        
        let messageContent: string;
        let time: string;
        let unread: boolean;

        if (isLocked) {
          // Mensagens bloqueadas simulam localização ou conteúdo genérico
          const city = allCities[index % allCities.length];
          messageContent = index % 2 === 0 ? `${city}` : '4 novas mensagens';
          time = ['22 h', '3 d', '4 d', '1 sem'][index % 4];
          unread = index % 3 === 0;
        } else {
          // Mensagens desbloqueadas (os dois primeiros)
          messageContent = ['Oi delícia, adivinha o que vc esq...', 'Encaminhou um reel de jonas.milgrau'][index];
          time = ['Agora', '33 min'][index];
          unread = true;
        }

        return {
          id: profile.username,
          name: maskUsername(profile.username),
          message: messageContent,
          time: time,
          unread: unread,
          locked: isLocked,
          avatar: profile.profile_pic_url,
        };
      });
      
      setMessages(suggestedMessages);

    } else {
      console.warn("Nenhum dado de invasão encontrado. Usando dados de fallback.");
      navigate('/');
    }
  }, [navigate]);

  const handleLockedClick = () => {
    navigate('/credits');
  };

  const handleChatClick = (user: Message) => {
    navigate(`/chat/${user.id}`, { state: { user } });
  };

  return (
    <div className="messages-page-container">
      <header className="messages-header">
        <div className="header-left-content">
          <button onClick={() => navigate('/invasion-simulation')} className="p-1">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </button>
          <div className="header-title">
            <span>{profileData?.username || 'mensagens'}</span>
          </div>
        </div>
        <div className="header-actions">
          <SmileyStarIcon size={28} strokeWidth={1.5} onClick={handleLockedClick} />
          <SquarePen size={24} strokeWidth={1.5} onClick={handleLockedClick} />
        </div>
      </header>

      <main>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <MetaAIIcon size={20} className="search-icon" />
            <input type="text" placeholder="Interaja com a Meta AI ou pesquise" className="search-input" readOnly onClick={handleLockedClick} />
          </div>
        </div>

        <div className="stories-container">
          <DirectStoryItem
            avatarUrl={profileData?.profilePicUrl || ''}
            name="Sua nota"
            note="Conte as novidades"
            isOwnStory
          />
          {stories.map(story => (
            <DirectStoryItem
              key={story.id}
              avatarUrl={story.avatar}
              name={story.name}
              note={story.note}
            />
          ))}
        </div>

        <div className="messages-section-header">
          <h2>Mensagens</h2>
          <span className="requests-link" onClick={handleLockedClick}>Pedidos (4)</span>
        </div>

        <div className="messages-list">
          {messages.map((msg, index) => (
            <MessageItem
              key={msg.id}
              avatarUrl={msg.avatar}
              name={msg.name}
              message={msg.message}
              time={msg.time}
              unread={msg.unread}
              locked={msg.locked}
              // Permite que os dois primeiros chats (index 0 e 1) sejam clicáveis se não estiverem bloqueados
              onClick={(!msg.locked && (index === 0 || index === 1)) ? () => handleChatClick(msg) : handleLockedClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;