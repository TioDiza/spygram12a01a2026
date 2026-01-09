import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Clock, MessageSquare, Award, MapPin, ShieldCheck } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  { icon: Zap, title: 'Acesso Imediato', description: 'Visualize o perfil completo assim que o pagamento for confirmado.' },
  { icon: MapPin, title: 'Localização em Tempo Real', description: 'Saiba exatamente onde a pessoa está no momento da invasão.' },
  { icon: ShieldCheck, title: '100% Seguro e Anônimo', description: 'Sua identidade é protegida. A invasão é indetectável.' },
  { icon: Clock, title: 'Acesso Vitalício', description: 'Pague uma vez e tenha acesso ao perfil para sempre, sem mensalidades.' },
  { icon: MessageSquare, title: 'Chat Ao Vivo', description: 'Acompanhe as conversas em tempo real e veja com quem a pessoa interage.' },
  { icon: Award, title: 'Garantia de 7 Dias', description: 'Se não estiver satisfeito, devolvemos seu dinheiro sem burocracia.' },
];

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => (
  <div className="flex flex-col items-center justify-center gap-3 p-6 bg-gray-800/50 rounded-xl h-full text-center border border-purple-700/50">
    <feature.icon className="w-10 h-10 text-purple-400 flex-shrink-0" />
    <h3 className="font-bold text-xl text-white">{feature.title}</h3>
    <p className="text-gray-400 text-sm">{feature.description}</p>
  </div>
);

const FeatureCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 0: none, 1: right, -1: left

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-sm mx-auto my-8">
      {/* Container do Carrossel */}
      <div className="relative h-64 overflow-hidden rounded-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 p-2"
          >
            <FeatureCard feature={features[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Botões de Navegação */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores de Posição */}
      <div className="flex justify-center gap-2 mt-4">
        {features.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-700 hover:bg-gray-500'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;