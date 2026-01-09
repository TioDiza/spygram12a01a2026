import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';
import ShineButton from './ui/ShineButton'; // Importa o ShineButton

interface PriceDiscountCardProps {
  originalPrice: string;
  discountedPrice: string;
  onUnlockClick: () => void; // Nova prop para o clique do botão
}

const PriceDiscountCard: React.FC<PriceDiscountCardProps> = ({ originalPrice, discountedPrice, onUnlockClick }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos (300)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-12 p-6 bg-red-900/30 border-2 border-red-600 rounded-xl shadow-2xl shadow-red-500/20 text-center relative overflow-hidden"
    >
      {/* Efeito de fundo de pulsação */}
      <div className="absolute inset-0 bg-red-900 opacity-50 animate-pulse-slow"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-yellow-400 animate-spin-slow" />
          <h2 className="text-2xl font-extrabold text-white uppercase">
            OFERTA RELÂMPAGO
          </h2>
          <Zap className="w-8 h-8 text-yellow-400 animate-spin-slow" />
        </div>

        <p className="text-lg text-gray-300 mb-2 font-medium">
          Preço Normal:
        </p>
        
        {/* Preços */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-3xl font-bold text-gray-400 line-through">
            {originalPrice}
          </span>
          <span className="text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-red-500 text-transparent bg-clip-text">
            {discountedPrice}
          </span>
        </div>

        {/* Contagem Regressiva */}
        <div className="bg-black/50 border border-red-700 rounded-lg p-3 inline-flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-red-400" />
          <span className="text-xl font-mono font-bold text-red-300">
            {formatTime(timeLeft)}
          </span>
          <span className="text-sm text-red-400">RESTANTE</span>
        </div>

        <p className="text-sm text-yellow-300 mb-4 font-semibold">
          Esta oferta expira em breve. Garanta seu acesso completo agora!
        </p>
        
        {/* Botão de CTA dentro do card */}
        <ShineButton 
          onClick={onUnlockClick} 
          className="w-full bg-red-600 focus:ring-red-500 active:scale-95"
          shineColorClasses="bg-red-600"
        >
          LIBERAR ACESSO COMPLETO AGORA
        </ShineButton>
      </div>
    </motion.div>
  );
};

export default PriceDiscountCard;