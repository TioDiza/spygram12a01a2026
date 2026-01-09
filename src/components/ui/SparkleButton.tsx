import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils'; // Caminho corrigido para 'cn'

interface SparkleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  checkoutUrl?: string; // Prop 'checkoutUrl' definida
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ children, onClick, disabled = false, checkoutUrl }) => {
  const baseButtonClasses = `
    relative z-10 flex items-center justify-center gap-1 rounded-full border-none
    w-full px-6 py-3 text-lg font-medium text-white
    bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const interactiveClasses = `
    cursor-pointer
    hover:scale-105 hover:ring-4 hover:ring-purple-500/50
    active:scale-100 active:ring-4 active:ring-purple-500/50
  `;

  const handleButtonClick = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank'); // Abre o URL em uma nova aba
    } else if (onClick) {
      onClick(); // Executa o onClick padrão se não houver checkoutUrl
    }
  };

  return (
    <div className={cn("relative w-[350px]", !disabled && "group")}> {/* Aplica 'group' condicionalmente para o brilho */}
      {/* O div para o brilho desfocado */}
      <div className="absolute inset-2 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      
      <button
        onClick={handleButtonClick}
        disabled={disabled}
        className={cn(
          baseButtonClasses,
          !disabled && interactiveClasses // Aplica classes interativas apenas se não estiver desabilitado
        )}
      >
        <Sparkles className="w-5 h-5 text-white" /> {/* Usando o ícone Sparkles */}
        <span className="text-center">{children}</span>
      </button>
    </div>
  );
};

export default SparkleButton;