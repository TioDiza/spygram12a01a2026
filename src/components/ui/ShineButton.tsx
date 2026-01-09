import React from 'react';
import { cn } from '../../lib/utils';

interface ShineButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  shineColorClasses?: string; // Classes para a cor do brilho (ex: 'bg-red-600')
}

const ShineButton: React.FC<ShineButtonProps> = ({ children, onClick, className, shineColorClasses = 'bg-purple-600' }) => {
  const baseClasses = `
    relative z-10 flex items-center justify-center rounded-full
    px-6 py-3 text-lg font-bold text-white
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-black
    active:scale-[0.98]
  `;

  return (
    // O div externo recebe a largura (w-full) e o arredondamento para cortar o brilho
    <div className={cn("relative w-full overflow-hidden group rounded-full", className)}>
      {/* Efeito de Brilho Desfocado (Glow) - Mantido, mas sem animação de pulso */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-1000 rounded-full",
          shineColorClasses,
          "blur-xl"
        )}
      ></div>
      
      {/* Botão Principal */}
      <button
        onClick={onClick}
        className={cn(
          baseClasses,
          "w-full", // Garante que o botão preencha a largura do div pai
          className // Aplica classes de cor aqui (ex: bg-red-600)
        )}
      >
        {/* NOVO: Efeito de Reflexo em Movimento */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div 
            // Reduzindo o blur para 5px para evitar vazamento excessivo
            className="absolute top-0 left-0 w-1/2 h-full bg-white/30 opacity-50 animate-shine-sweep"
            style={{ filter: 'blur(5px)' }} 
          ></div>
        </div>
        
        <span className="relative z-20">{children}</span>
      </button>
    </div>
  );
};

export default ShineButton;