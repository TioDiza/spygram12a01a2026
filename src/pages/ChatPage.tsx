import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Phone, Video, Mic, Camera, Sticker, Heart, VolumeX, EyeOff, Lock, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatPage.css';
import { Message } from './MessagesPage';
import LockedFeatureModal from '../components/LockedFeatureModal';

// Define a estrutura para uma mensagem no chat
interface ChatMessage {
  id: number;
  type: 'sent' | 'received' | 'date' | 'divider';
  content: string;
  reaction?: string;
  replyTo?: string;
  replyLabel?: string;
  isAudio?: boolean;
  audioDuration?: string;
  isBlurred?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  isHeart?: boolean;
  isStory?: boolean;
  storyAuthor?: string;
  storyAvatarUrl?: string;
  storyImageUrl?: string;
}

// Define os diálogos mockados
const DIALOGUES: { [key: string]: ChatMessage[] } = {
  // Diálogo Padrão (para o primeiro chat)
  DEFAULT_CHAT: [
    { id: 1, type: 'date', content: '3 dias atrás, 11:12' },
    { id: 2, type: 'received', content: 'Oi minha delícia' },
    { id: 3, type: 'sent', content: 'Oi amor da minha vidq' },
    { id: 4, type: 'sent', content: 'vida*' },
    { id: 5, type: 'received', content: 'To com saudade' },
    { id: 6, type: 'received', content: '', isImage: true, imageUrl: '/nudes1-chat1.jpg', reaction: '❤️' },
    { id: 7, type: 'received', content: 'Disso??' },
    { id: 8, type: 'sent', content: '😍😍😍😍😍😍' },
    { id: 9, type: 'received', content: 'Gostou amor?', isBlurred: true },
    { id: 10, type: 'sent', content: 'Áudio', isAudio: true, audioDuration: '0:11' },
    { id: 11, type: 'received', content: 'Fala pra ela que tem sim em São João del-Rei.', isBlurred: true },
    { id: 12, type: 'sent', content: 'Dboa, amanhã ou depois de amanhã', reaction: '👍🏻' },
    { id: 13, type: 'date', content: 'ONTEM, 21:34' },
    { id: 14, type: 'received', content: 'Amor' },
    { id: 15, type: 'received', content: 'Ta podendo falar?' },
    { id: 16, type: 'sent', content: 'Oii bb', replyTo: 'Amor', replyLabel: 'Você respondeu' },
    { id: 17, type: 'received', content: 'Perai que a vaca da Bruna tá aqui do lado', isBlurred: true },
    { id: 18, type: 'sent', content: 'kkkkkkkkk' },
    { id: 19, type: 'received', content: '🦌🦌🦌 kkkk', reaction: '😂' },
    { id: 20, type: 'received', content: 'Tô em Londrina já, só pra avisar mesmo', isBlurred: true, reaction: '❤️' },
    { id: 21, type: 'received', content: '❤️', isHeart: true },
    { id: 22, type: 'sent', content: 'Tá aonde' },
    { id: 23, type: 'sent', content: 'Na sua prima?' },
    { id: 24, type: 'received', content: 'Não', replyTo: 'Na sua prima?', replyLabel: 'respondeu a você' },
    { id: 25, type: 'received', content: 'Casa da Fernanda', isBlurred: true },
    { id: 26, type: 'sent', content: 'Tá bom 😘' },
    { id: 27, type: 'sent', content: 'Vou dar uma fodida e depois passo aí blz??', isBlurred: true, reaction: '❤️' },
    { id: 28, type: 'received', content: 'Áudio', isAudio: true, audioDuration: '0:32' },
    { id: 29, type: 'received', content: 'Áudio', isAudio: true, audioDuration: '0:07' },
    { id: 30, type: 'sent', content: 'Pode deixar' },
    { id: 31, type: 'received', content: '❤️', isHeart: true },
    { id: 32, type: 'divider', content: 'Novas mensagens' },
    { id: 33, type: 'date', content: 'HOJE' },
    { id: 34, type: 'received', content: 'Oi delícia, adivinha o que vc esqueceu aqui? kkkk' },
  ],
  
  // Diálogo para o segundo chat (ATUALIZADO)
  SECOND_CHAT: [
    { id: 1, type: 'received', content: '', isStory: true, storyAuthor: 'tinhooficial', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg', reaction: '😂' },
    { id: 2, type: 'date', content: '25 DE NOV, 15:22' },
    { id: 3, type: 'received', content: '', isStory: true, storyAuthor: 'ikarozets', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg' },
    { id: 4, type: 'date', content: '27 DE NOV, 20:15' },
    { id: 5, type: 'received', content: '', isStory: true, storyAuthor: 'tettrem', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg', reaction: '🥲' },
    { id: 6, type: 'sent', content: 'Esse achei triste' },
    { id: 7, type: 'date', content: '29 DE NOV, 14:08' },
    { id: 8, type: 'sent', content: '', isStory: true, storyAuthor: 'signodaputaria', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg' },
    { id: 9, type: 'received', content: '', isStory: true, storyAuthor: 'tettrem', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg' },
    { id: 10, type: 'date', content: 'ONTEM, 18:45' },
    { id: 11, type: 'sent', content: '', isStory: true, storyAuthor: 'safadodesejo', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg', reaction: '😂' },
    { id: 12, type: 'sent', content: 'kkkkkkkkkkkk' },
    { id: 13, type: 'received', content: 'Áudio', isAudio: true, audioDuration: '0:23', reaction: '😂' },
    { id: 14, type: 'date', content: 'ONTEM 22:11' },
    { id: 15, type: 'received', content: '', isStory: true, storyAuthor: 'morimura', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg' },
    { id: 16, type: 'divider', content: 'Novas mensagens' },
    { id: 17, type: 'date', content: 'HOJE' },
    { id: 18, type: 'received', content: '', isStory: true, storyAuthor: 'jonas.milgrau', storyAvatarUrl: '/perfil.jpg', storyImageUrl: '/perfil.jpg' },
  ],
};

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatUser = location.state?.user as Message | undefined;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  const getDialogue = useCallback((id: string) => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      const suggestedProfiles = data.suggestedProfiles || [];
      const secondUser = suggestedProfiles[1]; 
      if (secondUser && id === secondUser.username) {
        return DIALOGUES.SECOND_CHAT;
      }
    }
    return DIALOGUES.DEFAULT_CHAT;
  }, []);

  useEffect(() => {
    if (chatUser) {
      let dialogue = getDialogue(chatUser.id);
      // Atualiza dinamicamente o horário da última mensagem
      const lastDateMsgIndex = dialogue.findIndex(m => m.id === 17);
      if (lastDateMsgIndex !== -1) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        dialogue[lastDateMsgIndex].content = `${hours}:${minutes}`;
      }
      setMessages(dialogue);
    }
  }, [chatUser, getDialogue]);

  const handleLockedFeature = (feature: string) => {
    setModalFeatureName(feature);
    setIsModalOpen(true);
  };

  const handleAudioClick = () => {
    if (showVolumePopup) return;
    setShowVolumePopup(true);
    setTimeout(() => setShowVolumePopup(false), 2500);
  };

  const renderMessage = (msg: ChatMessage) => {
    if (msg.type === 'date') {
      return <div key={msg.id} className="message-date">{msg.content}</div>;
    }
    if (msg.type === 'divider') {
      return (
        <div key={msg.id} className="message-unread-divider">
          <div className="message-unread-line"></div>
          <span className="message-unread-text">{msg.content}</span>
          <div className="message-unread-line"></div>
        </div>
      );
    }

    const isSent = msg.type === 'sent';
    const isEmoji = !msg.isAudio && !msg.isImage && !msg.isHeart && !msg.isStory && msg.content.match(/^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udf00-\uffff]|\ud83d[\udc00-\uffff]|\ud83e[\udc00-\uffff])[\s\ufe0f]*$/) && msg.content.length < 10;

    return (
      <div key={msg.id} className={`message ${isSent ? 'sent' : 'received'}`}>
        {!isSent && chatUser && <img src={chatUser.avatar} alt={chatUser.name} className="message-avatar" />}
        <div className="message-bubble-container">
          {msg.replyTo && (
            <div className={`message-reply ${isSent ? 'sent' : 'received'}`}>
              <div className="reply-label">{msg.replyLabel}</div>
              <div className="reply-content-wrapper">
                <div className="reply-line"></div>
                <div className="reply-content">{msg.replyTo}</div>
              </div>
            </div>
          )}
          <div className={`message-bubble ${isEmoji ? 'emoji-bubble' : ''} ${msg.isHeart ? 'heart-bubble' : ''} ${msg.isStory ? 'story-bubble' : ''}`}>
            {msg.isStory && (
              <div className="story-encaminhado-recebido" onClick={() => handleLockedFeature('ver stories encaminhados')}>
                <div className="story-encaminhado-header">
                  <img src={msg.storyAvatarUrl} alt={msg.storyAuthor} className="story-encaminhado-avatar" />
                  <div className="story-encaminhado-info">
                    <span className="story-encaminhado-name">{msg.storyAuthor}</span>
                  </div>
                </div>
                <img src={msg.storyImageUrl} alt="Story" className="story-encaminhado-image" />
                <div className="sensitive-overlay">
                  <Lock size={32} />
                  <p>Conteúdo Bloqueado</p>
                </div>
              </div>
            )}
            {msg.isImage && msg.imageUrl && (
              <div className="message-image-container" onClick={() => handleLockedFeature('ver fotos e vídeos censurados')}>
                <img src={msg.imageUrl} alt="Conteúdo" className="message-image" />
                <div className="sensitive-overlay">
                  <EyeOff size={24} />
                </div>
              </div>
            )}
            {msg.isAudio && (
              <div className="audio-message" onClick={handleAudioClick}>
                <Play size={16} fill="white" />
                <div className="audio-waveform">
                  {[...Array(isSent ? 25 : 35)].map((_, i) => (
                    <div key={i} className="audio-waveform-bar" style={{ height: `${Math.floor(Math.random() * 14) + 2}px` }}></div>
                  ))}
                </div>
                <span className="audio-duration">{msg.audioDuration}</span>
              </div>
            )}
            {!msg.isImage && !msg.isAudio && !msg.isStory && (
              <span className={msg.isBlurred ? 'blurred-text' : ''}>{msg.content}</span>
            )}
            {msg.reaction && <div className="message-reaction">{msg.reaction}</div>}
          </div>
        </div>
      </div>
    );
  };

  if (!chatUser) return null;

  return (
    <div className="chat-container">
      <LockedFeatureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} featureName={modalFeatureName} />
      <AnimatePresence>
        {showVolumePopup && (
          <motion.div className="volume-popup-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="volume-popup-content" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: 'spring', damping: 15 }}>
              <p>Seja membro VIP para liberar o volume</p>
              <VolumeX className="volume-popup-icon" size={48} strokeWidth={1.5} />
              <div className="volume-popup-bar">
                {[...Array(15)].map((_, i) => <div key={i} className="volume-popup-bar-segment" />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="chat-header-sticky">
        <div className="chat-header-left">
          <button onClick={() => navigate('/messages')} className="back-button"><ChevronLeft size={28} strokeWidth={2.5} /></button>
          <div className="chat-user-info" onClick={() => handleLockedFeature('ver o perfil do usuário')}>
            <div className="chat-avatar-wrapper-header"><img src={chatUser.avatar} alt={chatUser.name} className="chat-avatar-img" /></div>
            <div className="chat-name-wrapper">
              <span className="chat-user-name">{chatUser.name}</span>
              <span className="chat-user-status">Online</span>
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          <button onClick={() => handleLockedFeature('fazer uma ligação')}><Phone size={24} /></button>
          <button onClick={() => handleLockedFeature('fazer uma chamada de vídeo')}><Video size={24} /></button>
        </div>
      </header>
      <main className="chat-messages">{messages.map(renderMessage)}</main>
      <footer className="message-input-container" onClick={() => handleLockedFeature('enviar mensagens')}>
        <div className="message-input-wrapper">
          <button className="input-icon-button camera-button"><Camera size={24} /></button>
          <input type="text" placeholder="Mensagem..." className="message-input" readOnly />
          <div className="message-input-actions">
            <button className="input-icon-button"><Mic size={22} /></button>
            <button className="input-icon-button"><Camera size={22} /></button>
            <button className="input-icon-button"><Sticker size={22} /></button>
            <button className="input-icon-button"><Heart size={22} /></button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;