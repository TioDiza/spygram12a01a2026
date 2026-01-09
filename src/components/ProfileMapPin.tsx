import React from 'react';

interface ProfileMapPinProps {
  profilePicUrl: string;
  username: string;
  size?: number; // Tamanho do pin (largura/altura)
}

const ProfileMapPin: React.FC<ProfileMapPinProps> = ({ profilePicUrl, username, size = 60 }) => {
  const pinSize = size;
  const avatarSize = size * 0.7; // 70% do tamanho do pin

  return (
    <div 
      className="relative flex flex-col items-center"
      style={{ width: pinSize, height: pinSize * 1.3 }} // Altura maior para o formato de pin
    >
      {/* O corpo do Pin (Formato de gota) */}
      <div 
        className="absolute top-0 bg-red-600 rounded-full shadow-xl border-2 border-white"
        style={{ 
          width: pinSize, 
          height: pinSize, 
          borderRadius: '50% 50% 50% 0', // Cria o formato de gota
          transform: 'rotate(-45deg)',
        }}
      >
        {/* A ponta do Pin (Triângulo) */}
        <div 
          className="absolute w-full h-full bg-red-600"
          style={{
            width: pinSize,
            height: pinSize,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(90deg)',
            top: '50%',
            left: '50%',
            zIndex: -1,
            opacity: 0, // Escondido, o formato principal já faz o trabalho
          }}
        ></div>
      </div>

      {/* O Avatar dentro do Pin */}
      <div 
        className="absolute flex items-center justify-center bg-white rounded-full overflow-hidden"
        style={{ 
          width: avatarSize, 
          height: avatarSize, 
          top: (pinSize - avatarSize) / 2, // Centraliza o avatar no círculo do pin
          zIndex: 10,
          transform: 'rotate(45deg)', // Rotação inversa para manter o avatar reto
        }}
      >
        <img 
          src={profilePicUrl} 
          alt={username} 
          className="w-full h-full object-cover"
          style={{ transform: 'rotate(-45deg)' }} // Rotação inversa para manter a imagem reta
        />
      </div>
      
      {/* A base do Pin (Sombra/Círculo no chão) */}
      <div 
        className="absolute bottom-0 w-1/2 h-2 bg-black/50 rounded-full blur-sm"
        style={{ bottom: 0 }}
      ></div>
    </div>
  );
};

export default ProfileMapPin;