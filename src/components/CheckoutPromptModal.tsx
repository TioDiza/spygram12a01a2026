import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import ShineButton from './ui/ShineButton'; // Importa o novo botão

interface CheckoutPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  checkoutUrl: string;
}

const CheckoutPromptModal: React.FC<CheckoutPromptModalProps> = ({ isOpen, onClose, featureName, checkoutUrl }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(10); // Reset countdown when closed
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Countdown finished, redirect
      window.open(checkoutUrl, '_blank');
      onClose();
    }
  }, [isOpen, countdown, checkoutUrl, onClose]);

  const handleAcquireAccess = () => {
    window.open(checkoutUrl, '_blank');
    onClose();
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
            className="bg-[#443a31]/90 backdrop-blur-md border border-[#6b5a4c] rounded-2xl shadow-lg text-white p-6 w-full max-w-sm text-center relative"
          >
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <ShieldAlert className="w-10 h-10 text-yellow-300 mx-auto mb-4" />
            
            <h2 className="text-xl font-bold mb-2">Ação bloqueada</h2>
            
            <p className="text-gray-300 text-sm mb-6">
              Seja um membro VIP do SpyGram para ter acesso a {featureName}.
            </p>
            
            <ShineButton 
              onClick={handleAcquireAccess} 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-colors"
              shineColorClasses="bg-yellow-300" 
            >
              DESBLOQUEAR ACESSO VIP AGORA
            </ShineButton>

            <p className="text-xs text-gray-400 mt-4">
              Redirecionando automaticamente em <span className="font-bold text-yellow-300">{countdown}</span> segundos...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutPromptModal;