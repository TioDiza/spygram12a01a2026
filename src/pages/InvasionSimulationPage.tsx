import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { ProfileData, SuggestedProfile, FeedPost } from '../../types';
import InstagramLoginSimulator from '../components/InstagramLoginSimulator';
import InvasionSuccessCard from '../components/InvasionSuccessCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import InstagramFeedMockup from '../components/InstagramFeedMockup';
import InstagramFeedContent from '../components/InstagramFeedContent';
import WebSidebar from '../components/WebSidebar';
import WebSuggestions from '../components/WebSuggestions';
import { getUserLocation, getCitiesByState } from '../services/geolocationService';
import LockedFeatureModal from '../components/LockedFeatureModal';
import { useAuth } from '../context/AuthContext';
import { MOCK_SUGGESTION_NAMES } from '../../constants';
import { fetchFullInvasionData } from '../services/profileService';

type SimulationStage = 'loading' | 'login_attempt' | 'success_card' | 'feed_locked' | 'error';

const InvasionSimulationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData | undefined>();
  const [suggestedProfiles, setSuggestedProfiles] = useState<SuggestedProfile[]>([]);
  const [posts, setPosts] = useState<FeedPost[] | undefined>();

  const [stage, setStage] = useState<SimulationStage>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFeatureName, setModalFeatureName] = useState('');

  useEffect(() => {
    const loadAllDataAndProceed = async () => {
      // Otimização: Se já estiver logado e houver dados na sessão, carregue-os e pule as chamadas de API.
      const storedData = sessionStorage.getItem('invasionData');
      if (isLoggedIn && storedData) {
        const data = JSON.parse(storedData);
        if (data.profileData && data.suggestedProfiles && data.posts) {
          console.log("Restaurando da sessão, pulando chamadas de API.");
          setProfileData(data.profileData);
          setSuggestedProfiles(data.suggestedProfiles);
          setPosts(data.posts);
          setLocations(data.locations || []);
          setStage('feed_locked');
          return; // Sai da função para evitar recarregamento
        }
      }

      // Lógica original para o primeiro carregamento
      let dataFromNav;
      if (location.state?.profileData) {
        dataFromNav = location.state;
      } else {
        dataFromNav = storedData ? JSON.parse(storedData) : null;
      }

      if (!dataFromNav?.profileData) {
        setErrorMessage('Nenhum dado de perfil encontrado. Redirecionando...');
        toast.error('Nenhum dado de perfil encontrado. Redirecionando...');
        setTimeout(() => navigate('/'), 3000);
        setStage('error');
        return;
      }

      const targetProfileData = dataFromNav.profileData;
      setProfileData(targetProfileData);

      let userCity = 'São Paulo';
      let cityList: string[] = [];
      try {
        const locationData = await getUserLocation();
        cityList = getCitiesByState(locationData.city, locationData.state);
        setLocations(cityList);
        userCity = locationData.city;
      } catch (e) {
        const fallbackCities = getCitiesByState('São Paulo', 'São Paulo');
        cityList = fallbackCities;
        setLocations(fallbackCities);
      }

      const { suggestions, posts: fetchedPosts } = await fetchFullInvasionData(targetProfileData);

      let fetchedSuggestions = suggestions;
      if (fetchedSuggestions.length === 0) {
          const shuffledNames = [...MOCK_SUGGESTION_NAMES].sort(() => 0.5 - Math.random());
          fetchedSuggestions = shuffledNames.slice(0, 15).map(name => ({
            username: name.toLowerCase().replace(' ', '') + Math.floor(Math.random() * 100),
            fullName: name,
            profile_pic_url: '/foto-bloqueada.png',
          }));
      }
      
      setSuggestedProfiles(fetchedSuggestions);
      setPosts(fetchedPosts);
      
      const dataToStore = {
        profileData: targetProfileData,
        suggestedProfiles: fetchedSuggestions,
        posts: fetchedPosts,
        userCity: userCity,
        locations: cityList, // Salva a lista de cidades na sessão
      };
      sessionStorage.setItem('invasionData', JSON.stringify(dataToStore));

      if (isLoggedIn) {
        setStage('feed_locked');
      } else {
        setStage('login_attempt');
      }
    };

    if (stage === 'loading') {
      loadAllDataAndProceed();
    }
  }, [location.state, navigate, stage, isLoggedIn]);

  const handleLoginSuccess = useCallback(() => {
    login();
    setStage('success_card');
    toast.success(`Acesso concedido ao perfil @${profileData?.username}!`);
    
    setTimeout(() => {
      setStage('feed_locked');
    }, 2000);
  }, [profileData?.username, login]);

  const handleLockedFeatureClick = useCallback((featureName: string) => {
    setModalFeatureName(featureName);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  if (!profileData || stage === 'loading') {
    if (errorMessage) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <ErrorMessage message={errorMessage} />
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black md:bg-[#121212] text-white font-sans w-full">
      <LockedFeatureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        featureName={modalFeatureName}
      />
      
      {stage === 'feed_locked' ? (
        <div className="w-full">
          <div className="block md:hidden">
            <InstagramFeedMockup 
              profileData={profileData} 
              suggestedProfiles={suggestedProfiles} 
              posts={posts || []}
              locations={locations}
              onLockedFeatureClick={handleLockedFeatureClick}
            />
          </div>
          <div className="hidden md:flex w-full justify-center">
            <WebSidebar profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
            <main className="w-full max-w-[630px] border-x border-gray-800 md:ml-64">
              <InstagramFeedContent 
                profileData={profileData} 
                suggestedProfiles={suggestedProfiles} 
                posts={posts || []}
                locations={locations}
                onLockedFeatureClick={handleLockedFeatureClick}
              />
            </main>
            <WebSuggestions profileData={profileData} onLockedFeatureClick={handleLockedFeatureClick} />
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <div className="flex items-center justify-center min-h-screen">
            {stage === 'login_attempt' && (
              <motion.div key="login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
                <InstagramLoginSimulator 
                  profileData={profileData} 
                  onSuccess={handleLoginSuccess}
                />
              </motion.div>
            )}
            {stage === 'success_card' && (
              <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full max-w-md">
                <InvasionSuccessCard profileData={profileData} />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default InvasionSimulationPage;