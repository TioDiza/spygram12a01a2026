import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileData, SuggestedProfile } from '../../types';
import { ShieldCheck, ChevronDown } from 'lucide-react';
import ProfileCardDetailed from '../components/ProfileCardDetailed';
import InteractionProfilesCarousel from '../components/InteractionProfilesCarousel';
import RealTimeLocationCard from '../components/RealTimeLocationCard';
import DatingAppCard from '../components/DatingAppCard';
import LicensePlateLocationCard from '../components/LicensePlateLocationCard';
import RecoveredDataCard from '../components/RecoveredDataCard';
import CheckoutPromptModal from '../components/CheckoutPromptModal';
import FeatureCarousel from '../components/FeatureCarousel';
import PriceDiscountCard from '../components/PriceDiscountCard';
import LiveChatFAQ from '../components/LiveChatFAQ';
import GuaranteeBanner from '../components/GuaranteeBanner';
import StaticFAQSection from '../components/StaticFAQSection';
import { motion, AnimatePresence } from 'framer-motion';
import ShineButton from '../components/ui/ShineButton'; // Importando o ShineButton

// Componente para a seção fixa (agora animado)
const FixedScrollPrompt: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-black/80 backdrop-blur-sm border-t border-gray-800"
      >
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Continue lendo</p>
          <ChevronDown className="w-6 h-6 text-gray-500 mx-auto animate-bounce-slow" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const CHECKOUT_URL = 'https://go.perfectpay.com.br/PPU38CPUD1S';

const InvasionConcludedPage: React.FC = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [userCity, setUserCity] = useState<string>('Sua Localização');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');
  const [showScrollPrompt, setShowScrollPrompt] = useState(true); // Novo estado para o prompt

  useEffect(() => {
    const storedData = sessionStorage.getItem('invasionData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setProfileData(data.profileData);
      setSuggestedProfiles(data.suggestedProfiles || []);
      setUserCity(data.userCity || 'Sua Localização');
    } else {
      navigate('/');
    }
  }, [navigate]);

  // Lógica para ocultar o prompt de rolagem
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    
    // Define um limite de 100px do final da página
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;

    setShowScrollPrompt(!isNearBottom);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Executa uma vez na montagem para verificar a posição inicial
    handleScroll(); 
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleUnlockClick = (feature: 'localização' | 'sites de namoro' | 'placa de carro' | 'fotos e conversas apagadas' | 'acesso completo') => {
    setModalFeatureName(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!profileData) {
    return null;
  }

  return (
    <div className="min-h-screen text-white font-sans p-4 sm:p-8 flex flex-col items-center relative z-10">
      
      {/* Checkout Prompt Modal */}
      <CheckoutPromptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        featureName={modalFeatureName}
        checkoutUrl={CHECKOUT_URL}
      />

      <main className="w-full max-w-md lg:max-w-4xl mx-auto text-center relative z-10 pt-12 pb-12"> {/* Reduzido pb-20 para pb-12 */}
        
        {/* Título Principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8">
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Invasão Concluída! 
          </span>
        </h1>

        {/* 1. Card de Perfil Detalhado (Perfil Pesquisado) */}
        <ProfileCardDetailed profileData={profileData} />

        {/* 2. Perfis com Maior Interação */}
        <h2 className="text-2xl font-extrabold text-white mt-4 mb-4">
          Perfis com Maior Interação 
          <span className="text-gray-500 font-normal text-lg ml-2">(Desbloqueie para ver nomes)</span>
        </h2>
        
        {/* CARROSSEL DE PERFIS */}
        <InteractionProfilesCarousel profiles={suggestedProfiles} />
        {/* FIM CARROSSEL */}

        {/* 3. Cartão de Localização em Tempo Real */}
        <RealTimeLocationCard 
          profileData={profileData} 
          userCity={userCity} 
          onUnlockClick={() => handleUnlockClick('localização')} // Aciona o modal
        />
        
        {/* 4. Cartão de Aplicativos de Relacionamento */}
        <DatingAppCard onUnlockClick={() => handleUnlockClick('sites de namoro')} /> 
        
        {/* 5. Cartão de Rastreamento Veicular */}
        <LicensePlateLocationCard onUnlockClick={() => handleUnlockClick('placa de carro')} />
        
        {/* 6. Cartão de Dados Recuperados (NOVO) */}
        <RecoveredDataCard onUnlockClick={() => handleUnlockClick('fotos e conversas apagadas')} />

        {/* Carrossel de Features */}
        <FeatureCarousel />

        {/* Card de Desconto */}
        <PriceDiscountCard 
          originalPrice="R$ 97,90" 
          discountedPrice="R$ 29,90" 
          onUnlockClick={() => handleUnlockClick('acesso completo')} // Passa a função de clique
        />

        <div className="mt-6 text-red-400 font-semibold animate-pulse">
          <p>ÚLTIMAS VAGAS DISPONÍVEIS!</p>
        </div>
        
        {/* Chat ao Vivo FAQ */}
        <LiveChatFAQ />
        
        {/* Banner de Garantia */}
        <GuaranteeBanner />

        {/* CTA Button after Guarantee */}
        <div className="mt-8 w-full">
          <ShineButton
            onClick={() => handleUnlockClick('acesso completo')}
            className="w-full bg-green-600 focus:ring-green-500 active:scale-95"
            shineColorClasses="bg-green-500"
          >
            <span className="text-lg font-extrabold">
              QUERO MEU ACESSO SEGURO AGORA
            </span>
          </ShineButton>
        </div>

        {/* Seção de Perguntas Frequentes Estáticas */}
        <StaticFAQSection />

      </main>

      {/* Footer */}
      <footer className="text-center mt-6 py-4 relative z-10"> {/* Reduzido mt-12 para mt-6 */}
        <div className="inline-flex items-center gap-2 text-gray-400 text-sm mb-1">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Pagamento Seguro | Site Protegido</span>
        </div>
        <p className="text-gray-500 text-xs">Todos os direitos reservados a SpyGram</p>
      </footer>
      
      {/* Prompt de Scroll Fixo */}
      <FixedScrollPrompt isVisible={showScrollPrompt} />
    </div>
  );
};

export default InvasionConcludedPage;