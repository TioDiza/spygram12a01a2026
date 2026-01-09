import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import ShineButton from './ui/ShineButton'; // Importar ShineButton

interface LockedFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

const LockedFeatureModal: React.FC<LockedFeatureModalProps> = ({ isOpen, onClose, featureName }) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onClose();
    navigate('/invasion-concluded'); // Redireciona para a página de vendas
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#3a312a]/90 border border-[#6b5a4c] rounded-2xl shadow-lg text-white p-6 w-full max-w-sm text-center"
          >
            <ShieldAlert className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
            
            <h2 className="text-xl font-bold mb-2">Ação bloqueada</h2>
            
            <p className="text-gray-300 text-sm mb-6">
              Seja um membro VIP do SpyGram para ter acesso a {featureName}.
            </p>
            
            <ShineButton
              onClick={handleUpgrade}
              // Ajustando as cores para o tema do modal (marrom/amarelo)
              className="w-full bg-[#6b5a4c] focus:ring-[#6b5a4c] active:scale-95"
              shineColorClasses="bg-yellow-400" 
            >
              Adquirir Acesso VIP
            </ShineButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LockedFeatureModal;