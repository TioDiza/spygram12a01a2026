import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils'; // Caminho corrigido

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void; // Nova prop para callback de conclusão
}

const TypingText: React.FC<TypingTextProps> = ({ text, speed = 70, className, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  // Resetar a animação quando o texto muda
  useEffect(() => {
    setDisplayedText('');
    setIndex(0);
  }, [text]);

  // Efeito para a animação de digitação
  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev: string) => prev + text[index]);
        setIndex((prev: number) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      // Digitação completa, chamar o callback
      if (onComplete) {
        onComplete();
      }
    }
  }, [index, text, speed, onComplete]);

  return (
    <p className={cn(className, "flex items-center")}>
      <span>{displayedText}</span> {/* Renderiza texto simples */}
      {index < text.length && <span className="animate-pulse">|</span>} {/* Cursor piscando */}
    </p>
  );
};

export default TypingText;