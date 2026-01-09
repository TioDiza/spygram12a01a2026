import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, Menu } from 'lucide-react';
import { ProfileData } from '../../types';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left">
    <Icon className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-400'}`} />
    <span className={`text-base ${active ? 'font-bold text-white' : 'text-gray-300'}`}>{label}</span>
  </button>
);

interface WebSidebarProps {
  profileData: ProfileData;
  onLockedFeatureClick: (featureName: string) => void;
}

const WebSidebar: React.FC<WebSidebarProps> = ({ profileData, onLockedFeatureClick }) => {
  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate('/messages');
  };

  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 h-full w-64 bg-black border-r border-gray-800 p-4 z-30">
      <div className="py-4 mb-6">
        <img
          src="/instagram-logo.png"
          alt="Instagram Logo"
          className="h-10"
          style={{ filter: 'invert(1)' }}
        />
      </div>
      <nav className="flex flex-col flex-grow space-y-2">
        <NavItem icon={Home} label="Página Inicial" active onClick={() => onLockedFeatureClick('acessar a página inicial')} />
        <NavItem icon={Search} label="Pesquisa" onClick={() => onLockedFeatureClick('fazer uma pesquisa')} />
        <NavItem icon={Compass} label="Explorar" onClick={() => onLockedFeatureClick('explorar o feed')} />
        <NavItem icon={Clapperboard} label="Reels" onClick={() => onLockedFeatureClick('ver os Reels')} />
        <NavItem icon={Send} label="Mensagens" onClick={handleMessagesClick} />
        <NavItem icon={Heart} label="Notificações" onClick={() => onLockedFeatureClick('ver as notificações')} />
        <NavItem icon={PlusSquare} label="Criar" onClick={() => onLockedFeatureClick('criar uma publicação')} />
        <button onClick={() => onLockedFeatureClick('ver o seu perfil')} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left">
          <img src={profileData.profilePicUrl} alt={profileData.username} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-base text-gray-300">Perfil</span>
        </button>
      </nav>
      <div className="mt-auto">
        <NavItem icon={Menu} label="Mais" onClick={() => onLockedFeatureClick('ver mais opções')} />
      </div>
    </aside>
  );
};

export default WebSidebar;