import React, { useMemo } from 'react';
import { cn } from '../lib/utils';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-[]{}|;:,.<>?/~`';
const SPYGRAM = 'SPYGRAM';
const COLUMN_COUNT = 40; // Aumentado para cobrir a largura, mas o espaçamento será maior
const FONT_SIZE = 20; // Aumentado para maior espaçamento vertical
const RAIN_LENGTH = 100; 

// Helper function to generate a single styled column as an array of React nodes
const generateStyledColumn = (columnIndex: number) => {
  const characters = [];
  let spygramIndex = 0;
  // Insere SPYGRAM em colunas a cada 7 colunas para que apareça periodicamente
  const shouldInsertSpygram = columnIndex % 7 === 0; 
  
  for (let i = 0; i < RAIN_LENGTH; i++) {
    let char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    // Cor base de contraste extremamente baixo (quase preto)
    let className = 'text-gray-950'; 

    // Lógica para inserir e destacar letras SPYGRAM
    if (shouldInsertSpygram && spygramIndex < SPYGRAM.length && i % 10 === 0) { 
      char = SPYGRAM[spygramIndex];
      className = 'text-purple-500 font-bold'; // Destaque roxo
      spygramIndex++;
    } else if (Math.random() < 0.02) { // Reduzida a chance de destaque aleatório
      // Destaque aleatório de outros caracteres com cores do tema (roxo/magenta)
      className = Math.random() > 0.5 ? 'text-purple-700' : 'text-pink-700';
    }

    characters.push(
      <span key={i} className={className}>
        {char}
      </span>
    );
  }
  return characters;
};

const MatrixRainBackground: React.FC = () => {
  const columnData = useMemo(() => {
    return Array(COLUMN_COUNT).fill(0).map((_, index) => ({
      content: generateStyledColumn(index),
      // Mantendo a velocidade lenta
      duration: Math.random() * 15 + 10, 
      delay: Math.random() * -10, 
    }));
  }, []);

  return (
    <>
      <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); } 
          100% { transform: translateY(100vh); }
        }
        .matrix-column {
          position: absolute;
          top: 0; 
          font-size: ${FONT_SIZE}px;
          line-height: ${FONT_SIZE}px; /* Garante o espaçamento vertical */
          white-space: pre;
          animation-name: matrix-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.8; 
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden z-0 bg-black">
        {columnData.map((col, index) => (
          <div
            key={index}
            className={cn("matrix-column")}
            style={{
              left: `${(index / COLUMN_COUNT) * 100}%`,
              animationDuration: `${col.duration}s`,
              animationDelay: `${col.delay}s`,
            }}
          >
            {col.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default MatrixRainBackground;