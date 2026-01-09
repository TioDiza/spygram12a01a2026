import React from 'react';

interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ checked, onChange }) => {
  return (
    <>
      <style>{`
        /* From Uiverse.io by 00Kubi - Adaptado por Dyad */ 
        .neon-checkbox {
          --primary: #E1306C; /* Instagram Pink */
          --primary-dark: #C13584; /* Instagram Dark Pink/Purple */
          --primary-light: #FCAF45; /* Instagram Yellow/Orange */
          --size: 18px; /* Tamanho reduzido em 40% */
          position: relative;
          width: var(--size);
          height: var(--size);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .neon-checkbox input {
          display: none;
        }

        .neon-checkbox__frame {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .neon-checkbox__box {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 4px;
          border: 1.5px solid var(--primary-dark); /* Ajustado */
          transition: all 0.4s ease;
        }

        .neon-checkbox__check-container {
          position: absolute;
          inset: 1px; /* Ajustado */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .neon-checkbox__check {
          width: 80%;
          height: 80%;
          fill: none;
          stroke: var(--primary);
          stroke-width: 2; /* Ajustado */
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 13; /* Ajustado */
          stroke-dashoffset: 13; /* Ajustado */
          transform-origin: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0; /* Adicionado: Oculta o checkmark por padrão */
        }

        .neon-checkbox__glow {
          position: absolute;
          inset: -1px; /* Ajustado */
          border-radius: 6px;
          background: var(--primary);
          opacity: 0;
          filter: blur(5px); /* Ajustado */
          transform: scale(1.2);
          transition: all 0.4s ease;
        }

        .neon-checkbox__borders {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          overflow: hidden;
        }

        .neon-checkbox__borders span {
          position: absolute;
          width: 24px; /* Ajustado */
          height: 1px;
          background: var(--primary);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .neon-checkbox__borders span:nth-child(1) {
          top: 0;
          left: -100%;
          animation: borderFlow1 2s linear infinite;
        }

        .neon-checkbox__borders span:nth-child(2) {
          top: -100%;
          right: 0;
          width: 1px;
          height: 24px; /* Ajustado */
          animation: borderFlow2 2s linear infinite;
        }

        .neon-checkbox__borders span:nth-child(3) {
          bottom: 0;
          right: -100%;
          animation: borderFlow3 2s linear infinite;
        }

        .neon-checkbox__borders span:nth-child(4) {
          bottom: -100%;
          left: 0;
          width: 1px;
          height: 24px; /* Ajustado */
          animation: borderFlow4 2s linear infinite;
        }

        .neon-checkbox__particles span {
          position: absolute;
          width: 2px; /* Ajustado */
          height: 2px; /* Ajustado */
          background: var(--primary);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          top: 50%;
          left: 50%;
          box-shadow: 0 0 3px var(--primary); /* Ajustado */
        }

        .neon-checkbox__rings {
          position: absolute;
          inset: -8px; /* Ajustado */
          pointer-events: none;
        }

        .neon-checkbox__rings .ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 0.5px solid var(--primary); /* Ajustado */
          opacity: 0;
          transform: scale(0);
        }

        .neon-checkbox__sparks span {
          position: absolute;
          width: 12px; /* Ajustado */
          height: 1px;
          background: linear-gradient(90deg, var(--primary), transparent);
          opacity: 0;
        }

        /* Hover Effects */
        .neon-checkbox:hover .neon-checkbox__box {
          border-color: var(--primary);
          transform: scale(1.05);
        }

        /* Checked State */
        .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__box {
          border-color: var(--primary);
          background: rgba(225, 48, 108, 0.1); /* Instagram Pink with opacity */
        }

        .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__check {
          stroke-dashoffset: 0;
          transform: scale(1.1);
          opacity: 1; /* Adicionado: Torna o checkmark visível quando marcado */
        }

        .neon-checkbox input:checked ~ .neon-checkbox__frame .neon-checkbox__glow {
          opacity: 0.2;
        }

        .neon-checkbox
          input:checked
          ~ .neon-checkbox__frame
          .neon-checkbox__borders
          span {
          opacity: 1;
        }

        /* Particle Animations */
        .neon-checkbox
          input:checked
          ~ .neon-checkbox__frame
          .neon-checkbox__particles
          span {
          animation: particleExplosion 0.6s ease-out forwards;
        }

        .neon-checkbox
          input:checked
          ~ .neon-checkbox__frame
          .neon-checkbox__rings
          .ring {
          animation: ringPulse 0.6s ease-out forwards;
        }

        .neon-checkbox
          input:checked
          ~ .neon-checkbox__frame
          .neon-checkbox__sparks
          span {
          animation: sparkFlash 0.6s ease-out forwards;
        }

        /* Animations */
        @keyframes borderFlow1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes borderFlow2 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(200%);
          }
        }

        @keyframes borderFlow3 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-200%);
          }
        }

        @keyframes borderFlow4 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-200%);
          }
        }

        @keyframes particleExplosion {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(
                calc(-50% + var(--x, 20px)),
                calc(-50% + var(--y, 20px))
              )
              scale(0);
            opacity: 0;
          }
        }

        @keyframes ringPulse {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes sparkFlash {
          0% {
            transform: rotate(var(--r, 0deg)) translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--r, 0deg)) translateX(30px) scale(0);
            opacity: 0;
          }
        }

        /* Particle Positions */
        .neon-checkbox__particles span:nth-child(1) {
          --x: 15px; /* Ajustado */
          --y: -15px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(2) {
          --x: -15px; /* Ajustado */
          --y: -15px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(3) {
          --x: 15px; /* Ajustado */
          --y: 15px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(4) {
          --x: -15px; /* Ajustado */
          --y: 15px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(5) {
          --x: 20px; /* Ajustado */
          --y: 0px;
        }
        .neon-checkbox__particles span:nth-child(6) {
          --x: -20px; /* Ajustado */
          --y: 0px;
        }
        .neon-checkbox__particles span:nth-child(7) {
          --x: 0px;
          --y: 20px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(8) {
          --x: 0px;
          --y: -20px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(9) {
          --x: 12px; /* Ajustado */
          --y: -18px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(10) {
          --x: -12px; /* Ajustado */
          --y: 18px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(11) {
          --x: 18px; /* Ajustado */
          --y: 12px; /* Ajustado */
        }
        .neon-checkbox__particles span:nth-child(12) {
          --x: -18px; /* Ajustado */
          --y: -12px; /* Ajustado */
        }

        /* Spark Rotations */
        .neon-checkbox__sparks span:nth-child(1) {
          --r: 0deg;
          top: 50%;
          left: 50%;
        }
        .neon-checkbox__sparks span:nth-child(2) {
          --r: 90deg;
          top: 50%;
          left: 50%;
        }
        .neon-checkbox__sparks span:nth-child(3) {
          --r: 180deg;
          top: 50%;
          left: 50%;
        }
        .neon-checkbox__sparks span:nth-child(4) {
          --r: 270deg;
          top: 50%;
          left: 50%;
        }

        /* Ring Delays */
        .neon-checkbox__rings .ring:nth-child(1) {
          animation-delay: 0s;
        }
        .neon-checkbox__rings .ring:nth-child(2) {
          animation-delay: 0.1s;
        }
        .neon-checkbox__rings .ring:nth-child(3) {
          animation-delay: 0.2s;
        }
      `}</style>
      <label className="flex items-center space-x-2 cursor-pointer">
        <div className="neon-checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
          />
          <div className="neon-checkbox__frame">
            <div className="neon-checkbox__box"></div>
            <div className="neon-checkbox__check-container">
              <svg className="neon-checkbox__check" viewBox="0 0 16 16">
                <polyline points="4,8 7,12 12,4"></polyline>
              </svg>
            </div>
            <div className="neon-checkbox__glow"></div>
            <div className="neon-checkbox__borders">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="neon-checkbox__particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="neon-checkbox__rings">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
            </div>
            <div className="neon-checkbox__sparks">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <span className="text-gray-300 text-sm">Realmente quero ter acesso ao perfil acima.</span>
      </label>
    </>
  );
};

export default ConsentCheckbox;