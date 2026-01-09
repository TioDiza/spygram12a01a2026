import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Flame, Search, Lock } from 'lucide-react';
import ShineButton from './ui/ShineButton'; // Importa ShineButton

interface DatingAppCardProps {
  onUnlockClick: () => void;
}

const DatingAppCard: React.FC<DatingAppCardProps> = ({ onUnlockClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-12 mb-12 p-6 text-center w-full mx-auto relative overflow-hidden" // Removido fundo e arredondamento
    >
      {/* Efeito de fundo sutil (MANTIDO, mas agora é um elemento de fundo flutuante) */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.5) 0%, transparent 70%)',
      }}></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Flame className="w-10 h-10 text-red-400 animate-pulse" />
          <h2 className="text-3xl font-extrabold text-white">
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 text-transparent bg-clip-text">
              O SEGREDO MAIS QUENTE
            </span>
          </h2>
          <Heart className="w-10 h-10 text-pink-400 animate-pulse" />
        </div>

        <p className="text-gray-200 mb-6 max-w-md mx-auto text-lg font-medium">
          **DESMASCARADO!** Descubra agora se o seu alvo está ativo no **Tinder, Badoo, Happn** ou qualquer outro aplicativo de relacionamento.
        </p>
        
        {/* Mockup de Busca */}
        <div className="flex items-center justify-center gap-3 bg-black/50 border border-red-700 rounded-full p-3 mb-6 w-fit mx-auto">
            <Search className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Buscando perfis de namoro...</span>
            <Lock className="w-5 h-5 text-red-400" />
        </div>

        <p className="text-xl text-yellow-300 font-bold mb-6">
          Não viva na dúvida. Obtenha a verdade que pode mudar tudo!
        </p>

        <ShineButton 
          onClick={onUnlockClick} 
          className="w-full bg-red-600 focus:ring-red-500 active:scale-95"
          shineColorClasses="bg-red-600"
        >
          VERIFICAR APPS DE NAMORO AGORA
        </ShineButton>
      </div>
    </motion.div>
  );
};

export default DatingAppCard;