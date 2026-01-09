import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProfileData } from '../../types';

interface InvasionSuccessCardProps {
  profileData: ProfileData;
}

const InvasionSuccessCard: React.FC<InvasionSuccessCardProps> = ({ profileData }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="w-full max-w-md mx-auto p-8 bg-gray-900/80 backdrop-blur-md border border-green-500 rounded-xl shadow-2xl shadow-green-500/20 text-center"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce-slow" />
      <h2 className="text-3xl font-extrabold text-white mb-2">INVASÃO BEM-SUCEDIDA!</h2>
      <p className="text-gray-300 mb-6">
        Acesso total concedido ao perfil de:
      </p>
      
      <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <img
          src={profileData.profilePicUrl}
          alt={profileData.username}
          className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
        />
        <div>
          <p className="text-xl font-bold text-white">@{profileData.username}</p>
          <p className="text-sm text-gray-400">{profileData.fullName}</p>
        </div>
      </div>

      <p className="text-sm text-green-400 mt-6 font-semibold">
        Preparando a visualização do feed...
      </p>
    </motion.div>
  );
};

export default InvasionSuccessCard;