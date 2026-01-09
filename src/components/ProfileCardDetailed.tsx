import React from 'react';
import { ProfileData } from '../../types';
import { Zap } from 'lucide-react';

interface ProfileCardDetailedProps {
  profileData: ProfileData;
}

// Função para formatar o número, agora retornando o valor exato (sem K ou M)
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('pt-BR').format(num);
};

const ProfileCardDetailed: React.FC<ProfileCardDetailedProps> = ({ profileData }) => {
  
  // Usar a biografia real, ou um placeholder se não houver
  const bioLines = profileData.biography ? profileData.biography.split('\n').filter(line => line.trim() !== '') : [];
  
  // A primeira linha da bio é usada para o ícone Zap
  const bioLine1 = bioLines[0] || ''; // Se não houver bio, a primeira linha é vazia
  const remainingBio = bioLines.slice(1).join('\n');

  // Verifica se há alguma linha de biografia para renderizar a seção
  const hasBioContent = bioLine1 || remainingBio;

  return (
    <div className="bg-gray-900/80 border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 w-full mx-auto">
      {/* Header: Pic, Username, Fullname */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profileData.profilePicUrl}
          alt={profileData.username}
          className="w-20 h-20 rounded-full object-cover border-2 border-pink-500"
        />
        <div className="flex-1 text-left">
          <p className="text-2xl font-bold text-white">@{profileData.username}</p>
          <p className="text-gray-400">{profileData.fullName} 😟</p>
        </div>
      </div>

      {/* Stats: Posts, Followers, Following */}
      <div className="flex justify-around text-center text-sm border-t border-b border-gray-800 py-4 mb-4">
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.postsCount)}</p>
          <p className="text-gray-400 text-xs">Posts</p>
        </div>
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.followers)}</p>
          <p className="text-gray-400 text-xs">Followers</p>
        </div>
        <div>
          <p className="font-bold text-xl text-white">{formatNumber(profileData.following)}</p>
          <p className="text-gray-400 text-xs">Following</p>
        </div>
      </div>

      {/* Biography */}
      {hasBioContent && (
        <div className="text-sm text-gray-300 text-left space-y-1">
          {/* Primeira linha da Bio com Zap Icon */}
          {bioLine1 && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>{bioLine1}</span>
            </div>
          )}
          
          {/* Restante da Biografia */}
          {remainingBio && (
            <p className="whitespace-pre-wrap pt-2">{remainingBio}</p>
          )}
        </div>
      )}

      {/* Private Status Banner */}
      {profileData.isPrivate && (
        <div className="mt-6 bg-yellow-800/50 border border-yellow-600 text-yellow-300 px-4 py-3 rounded-lg text-center text-sm font-semibold">
          Este perfil é privado. O SpyGram conseguiu invadir mesmo assim!
        </div>
      )}
    </div>
  );
};

export default ProfileCardDetailed;