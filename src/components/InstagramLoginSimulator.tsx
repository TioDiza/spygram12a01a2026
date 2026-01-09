import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Facebook } from 'lucide-react';
import { ProfileData } from '../../types';

interface InstagramLoginSimulatorProps {
  profileData: ProfileData;
  onSuccess: () => void;
}

type AttemptStage = 'typing' | 'attempting' | 'error' | 'success_typing' | 'success';

// Função para gerar senhas aleatórias para as tentativas falhas
const generateRandomPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  const length = Math.floor(Math.random() * 5) + 8; // 8 a 12 caracteres
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// A senha "correta" que a simulação irá "encontrar"
const correctPassword = 'biel_2805@';

const InstagramLoginSimulator: React.FC<InstagramLoginSimulatorProps> = ({ profileData, onSuccess }) => {
  const [attemptCount, setAttemptCount] = useState(1);
  const [currentPassword, setCurrentPassword] = useState('');
  const [displayedPassword, setDisplayedPassword] = useState('');
  const [stage, setStage] = useState<AttemptStage>('typing');
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efeito que gerencia a máquina de estados da animação
  useEffect(() => {
    const runAnimationCycle = () => {
      if (stage === 'typing') {
        if (displayedPassword.length < currentPassword.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedPassword(prev => currentPassword.substring(0, prev.length + 1));
          }, 40);
        } else {
          setStage('attempting');
        }
      } else if (stage === 'attempting') {
        timeoutRef.current = setTimeout(() => {
          if (attemptCount >= 4) { // Sucesso após 4 tentativas
            setDisplayedPassword('');
            setStage('success_typing');
          } else {
            setStage('error');
          }
        }, 500);
      } else if (stage === 'error') {
        timeoutRef.current = setTimeout(() => {
          setAttemptCount(prev => prev + 1);
          setCurrentPassword(generateRandomPassword());
          setDisplayedPassword('');
          setStage('typing');
        }, 1200); // Atraso maior no erro para dar tempo de ler a mensagem
      } else if (stage === 'success_typing') {
        if (displayedPassword.length < correctPassword.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayedPassword(prev => correctPassword.substring(0, prev.length + 1));
          }, 60);
        } else {
          setStage('success');
        }
      } else if (stage === 'success') {
        timeoutRef.current = setTimeout(onSuccess, 1500);
      }
    };

    runAnimationCycle();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [stage, displayedPassword, currentPassword, onSuccess, attemptCount]);

  // Efeito para inicializar a primeira senha
  useEffect(() => {
    setCurrentPassword(generateRandomPassword());
  }, []);

  const getPasswordDisplay = () => {
    if (stage === 'success_typing') return displayedPassword;
    if (stage === 'typing') return displayedPassword;
    if (stage === 'success') return '•'.repeat(correctPassword.length);
    return '•'.repeat(currentPassword.length);
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-black text-white flex flex-col items-center justify-center min-h-screen font-sans">
      <div className="w-full text-center flex flex-col items-center">
        
        <img
          src="/instagram-logo.png"
          alt="Instagram Logo"
          className="h-16 mx-auto mb-10"
          style={{ filter: 'invert(1)' }}
        />
        
        <form className="w-full flex flex-col gap-2">
          <input
            type="text"
            value={profileData.username}
            readOnly
            className="w-full bg-[#1e1e1e] text-gray-300 px-3 py-2.5 rounded-md border border-gray-700 text-sm"
          />
          <div className="relative w-full">
            <input
              type="password"
              value={getPasswordDisplay()}
              readOnly
              className={`w-full px-3 py-2.5 rounded-md text-sm font-mono
                bg-[#1e1e1e] border
                ${stage === 'error' ? 'border-red-500 text-red-300' : 'border-gray-700 text-white'}
                focus:outline-none`}
            />
            {(stage === 'typing' || stage === 'success_typing') && (
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white animate-pulse">|</span>
            )}
          </div>

          {stage === 'error' && (
            <p className="text-red-500 text-xs text-center mt-2">
              A senha que você inseriu está incorreta.
            </p>
          )}

          {stage !== 'success' && (
            <div className="mt-4 flex items-center gap-3 bg-[#1e1e1e] border border-gray-700 rounded-lg p-3 text-left">
              <RotateCw className="w-6 h-6 text-purple-400 animate-spin" />
              <div>
                <p className="text-sm font-semibold text-white">Quebrando criptografia da conta</p>
                <p className="text-xs text-gray-400">Testando combinações de senha...</p>
              </div>
            </div>
          )}

          <button
            type="button"
            className="w-full mt-4 py-2 rounded-lg font-semibold text-white text-sm bg-[#0095f6] opacity-70 cursor-not-allowed"
            disabled={true}
          >
            Entrar
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-xs text-[#0095f6] no-underline">
            Esqueceu a senha?
          </a>
        </div>

        <div className="flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="px-4 text-xs font-semibold text-gray-500">OU</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <button className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0095f6]">
          <Facebook className="w-5 h-5" />
          <span>Entrar com o Facebook</span>
        </button>

      </div>
      <footer className="absolute bottom-4 text-center text-xs">
        <p className="text-gray-500">
          Não tem uma conta?{' '}
          <a href="#" className="font-semibold text-[#0095f6] no-underline">
            Cadastre-se.
          </a>
        </p>
      </footer>
    </div>
  );
};

export default InstagramLoginSimulator;