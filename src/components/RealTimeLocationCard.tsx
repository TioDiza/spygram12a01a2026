import React from 'react';
import { motion } from 'framer-motion';
import { ProfileData } from '../../types';
import ProfileMapPin from './ProfileMapPin'; // Importa o novo componente

interface RealTimeLocationCardProps {
  profileData: ProfileData;
  userCity: string;
  onUnlockClick: () => void; // Adiciona a prop de clique
}

const RealTimeLocationCard: React.FC<RealTimeLocationCardProps> = ({ profileData, userCity, onUnlockClick }) => {
  // Se a cidade for o fallback, exibe 'SUA LOCALIZAÇÃO', caso contrário, exibe a cidade real.
  const locationText = userCity.toLowerCase() === 'sua localização' 
    ? 'SUA LOCALIZAÇÃO' 
    : userCity.toUpperCase();
    
  // Verifica se a cidade é válida para exibição da frase extra
  const showFoundNearText = userCity.toLowerCase() !== 'são paulo' && userCity.toLowerCase() !== 'sua localização';

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-16 mb-12 p-0 text-center w-full mx-auto" // Removido padding, fundo e arredondamento
    >
      <h2 className="text-3xl font-extrabold text-white mb-4">
        <span className="bg-gradient-to-r from-red-500 to-pink-600 text-transparent bg-clip-text">
          RASTREAMENTO DE LOCALIZAÇÃO EM TEMPO REAL
        </span>
      </h2>
      <p className="text-gray-300 mb-4 max-w-md mx-auto text-lg font-medium">
        **PROVA IRREFUTÁVEL!** Nosso sistema de rastreamento de IP de última geração capturou a localização exata do alvo.
        <span className="block mt-2 text-yellow-400 font-bold">
          Desbloqueie agora e veja onde ele está neste exato momento!
        </span>
      </p>
      
      {/* Nova frase condicional */}
      {showFoundNearText && (
        <p className="text-sm text-gray-400 font-semibold mb-8">
          Perfil encontrado perto de <span className="text-white font-bold">{userCity}</span>
        </p>
      )}
      
      {/* Map Mockup with Profile Picture Marker (Novo Mapa) */}
      <div className="relative w-full max-w-xs mx-auto aspect-square bg-[#1a1a1a] rounded-2xl overflow-hidden mb-6 border border-red-700/50">
        {/* Simulated Map Grid Background */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}>
          {/* Simulated Roads/Features */}
          <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-700/50 transform rotate-[-5deg]"></div>
          <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-700/50 transform rotate-[10deg]"></div>
          <div className="absolute left-1/4 top-0 h-full w-1 bg-gray-700/50 transform rotate-[5deg]"></div>
        </div>
        
        {/* Animated Radar Effect (Outer Ring) */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-3/4 h-3/4 border-4 border-red-500 rounded-full opacity-50"></div>
        </motion.div>
        
        {/* Profile Map Pin Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ProfileMapPin 
            profilePicUrl={profileData.profilePicUrl} 
            username={profileData.username} 
            size={50} // Tamanho ajustado para caber no mapa
          />
        </div>

        {/* Location Text Overlay (Balão) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 px-8 py-4 rounded-full border border-red-600 shadow-xl opacity-0">
          <p className="text-xl font-bold text-red-400">
            PERTO DE {locationText}
          </p>
        </div>

        {/* BOTÃO DESCOBRIR LOCALIZAÇÃO (Posicionado mais acima e menor) */}
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-[60%]">
          <button
            onClick={onUnlockClick}
            className="w-full py-1.5 px-3 text-xs font-bold text-black rounded-lg bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
          >
            DESCOBRIR LOCALIZAÇÃO
          </button>
        </div>
      </div>
      
      <p className="text-sm text-red-400 font-semibold">
        Atenção: A localização é atualizada a cada 5 minutos. Não perca essa chance!
      </p>
    </motion.div>
  );
};

export default RealTimeLocationCard;