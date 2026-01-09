import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CustomSearchBar from '@/src/components/ui/CustomSearchBar';
import SparkleButton from '@/src/components/ui/SparkleButton';
import ErrorMessage from '@/src/components/ErrorMessage';
import ConsentCheckbox from '@/src/components/ConsentCheckbox';
import { Lock } from 'lucide-react';
import LoginPage from '@/src/pages/LoginPage';
import ServersPage from '@/src/pages/ServersPage';
import CreditsPage from '@/src/pages/CreditsPage';
import MessagesPage from '@/src/pages/MessagesPage';
import ChatPage from '@/src/pages/ChatPage';
import ProgressBar from '@/src/components/ProgressBar';
import InvasionSimulationPage from '@/src/pages/InvasionSimulationPage';
import InvasionConcludedPage from '@/src/pages/InvasionConcludedPage';
import ProfileConfirmationCard from '@/src/components/ProfileConfirmationCard';
import { MIN_LOADING_DURATION } from './constants';
import { fetchProfileData } from './src/services/profileService';
import { AuthProvider } from './src/context/AuthContext';
import ProtectedRoute from './src/components/ProtectedRoute';
import { ProfileData, SuggestedProfile, FeedPost } from './types';
import BackgroundLayout from './src/components/BackgroundLayout'; // Import BackgroundLayout

// Componente principal que contém a lógica de pesquisa e roteamento
const MainAppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [progressBarProgress, setProgressBarProgress] = useState(0);
  const [confirmedProfileData, setConfirmedProfileData] = useState<ProfileData | null>(null);
  const [confirmedSuggestions, setConfirmedSuggestions] = useState<SuggestedProfile[]>([]);
  const [confirmedPosts, setConfirmedPosts] = useState<FeedPost[]>([]); // Novo estado para posts
  const navigate = useNavigate();

  // Efeito para simular o progresso da barra enquanto isLoading está ativo
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isLoading) {
      setProgressBarProgress(0);
      
      interval = setInterval(() => {
        setProgressBarProgress((prev: number) => {
          if (prev < 95) {
            return prev + 1;
          }
          return prev;
        });
      }, 100);
    } else {
      setProgressBarProgress(100);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }
    if (!hasConsented) {
      setError('Você precisa consentir para acessar o perfil.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setProgressBarProgress(0);
    setConfirmedProfileData(null);
    setConfirmedSuggestions([]);
    setConfirmedPosts([]); // Limpa posts antigos

    try {
      const fetchPromise = fetchProfileData(searchQuery.trim());
      const minimumDurationPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_DURATION));
      const [fetchResult] = await Promise.all([
        fetchPromise,
        minimumDurationPromise,
      ]);
      setConfirmedProfileData(fetchResult.profile);
      setConfirmedSuggestions(fetchResult.suggestions);
      setConfirmedPosts(fetchResult.posts); // Salva os posts
    } catch (err) {
      setError("Sistema sobrecarregado devido a grande quantidade de usuários, tente novamente mais tarde");
      console.error('Error during search process:', err);
    } finally {
      setIsLoading(false);
      setProgressBarProgress(100);
    }
  }, [searchQuery, hasConsented]);

  const handleConfirmInvasion = useCallback(() => {
    if (confirmedProfileData) {
      const invasionData = {
        profileData: confirmedProfileData,
        suggestedProfiles: confirmedSuggestions,
        posts: confirmedPosts,
      };
      // Armazena os dados na sessão para persistir entre as páginas
      sessionStorage.setItem('invasionData', JSON.stringify(invasionData));

      navigate('/invasion-simulation', { 
        state: invasionData
      });
    }
  }, [confirmedProfileData, confirmedSuggestions, confirmedPosts, navigate]);

  const handleCorrectUsername = useCallback(() => {
    setConfirmedProfileData(null);
    setConfirmedSuggestions([]);
    setConfirmedPosts([]);
    setSearchQuery('');
    setError(null);
  }, []);

  if (confirmedProfileData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <ProfileConfirmationCard
          profileData={confirmedProfileData}
          onConfirm={handleConfirmInvasion}
          onCorrect={handleCorrectUsername}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <ProgressBar progress={progressBarProgress} isVisible={isLoading} />
      <div className="relative z-20 text-white font-sans flex flex-col items-center px-4 sm:px-8 pt-12 pb-8 w-full"> {/* Ajustado padding */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          @keyframes tilt {
            0%, 50%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
          }
          .animate-tilt {
            animation: tilt 10s infinite linear;
          }
          @keyframes logo-float-pulse {
            0% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-5px) scale(1.02); }
            50% { transform: translateY(0) scale(1.04); }
            75% { transform: translateY(5px) scale(1.02); }
            100% { transform: translateY(0) scale(1); }
          }
          .animate-logo-float-pulse {
            animation: logo-float-pulse 4s infinite ease-in-out;
          }
          @keyframes blob-animation {
            0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          }
          .animate-blob {
            animation: blob-animation 10s infinite alternate;
          }
          @keyframes logo-entrance {
            from { opacity: 0; transform: translateY(50px) scale(0.8); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-logo-entrance {
            animation: logo-entrance 1s ease-out forwards;
          }
          @keyframes logo-background-pulse {
            0%, 100% { opacity: 0.03; }
            50% { opacity: 0.10; }
          }
          .animate-logo-background-pulse {
            animation: logo-background-pulse 3s infinite ease-in-out alternate;
          }
          .logo-radial-background {
            background-image: radial-gradient(circle at center,
              rgba(236, 72, 153, 0.4) 0%,
              rgba(147, 51, 234, 0.2) 50%,
              rgba(251, 191, 36, 0) 100%
            );
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          .animate-pulse {
            animation: pulse 1.5s infinite ease-in-out;
          }
        `}</style>
        
        <header className="text-center mb-8 relative w-full max-w-xl"> {/* Ajustado margin */}
          <div className="relative group mx-auto w-fit mb-4">
            <div className="absolute -inset-0.5 blur animate-tilt animate-blob animate-logo-background-pulse logo-radial-background"></div>
            
            <img
              src="/spygram_transparentebranco.png"
              alt="SpyGram Logo"
              className="h-20 md:h-32 relative z-10 animate-logo-float-pulse rounded-full animate-logo-entrance" 
              /* Ajustado tamanho mobile */
            />
          </div>
          
          {/* Texto original restaurado */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">
              SPYGRAM
            </span>
          </h1>

          <p className="text-center text-xl md:text-2xl font-bold mt-4 animate-fade-in">
            <span className="text-white">ACESSE O </span>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">INSTAGRAM</span>
            <span className="text-white"> DE QUALQUER PESSOA, </span>
            <span className="inline-block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text">SEM SENHA</span>
            <span className="text-white">, APENAS COM O @</span>
          </p>
        </header>
        
        <main className="w-full flex flex-col items-center">
          <CustomSearchBar 
            query={searchQuery} 
            setQuery={setSearchQuery} 
            isLoading={isLoading} 
          />
          <div className="mt-6 flex justify-center">
            <ConsentCheckbox checked={hasConsented} onChange={setHasConsented} />
          </div>
          <div className="mt-6">
            <SparkleButton onClick={handleSearch} disabled={isLoading || !hasConsented}>
              {isLoading ? 'Buscando Perfil...' : 'Invadir Conta'}
            </SparkleButton>
          </div>
          <div className="w-full mt-4">
            {error && <ErrorMessage message={error} />}
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center mb-2">
            <Lock className="w-4 h-4 mr-1 text-green-500" />
            <span>SSL Verificado</span>
          </div>
          <p>Todos os direitos reservados a SpyGram</p>
        </footer>
      </div>
    </div>
  );
};

// Componente App que configura o Router
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas que DEVEM ter o background */}
          <Route path="/" element={<BackgroundLayout><MainAppContent /></BackgroundLayout>} />
          <Route path="/login" element={<BackgroundLayout><LoginPage /></BackgroundLayout>} />
          <Route 
            path="/servers" 
            element={
              <ProtectedRoute>
                <BackgroundLayout><ServersPage /></BackgroundLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/credits" 
            element={
              <ProtectedRoute>
                <BackgroundLayout><CreditsPage /></BackgroundLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/invasion-concluded" 
            element={
              <ProtectedRoute>
                <BackgroundLayout><InvasionConcludedPage /></BackgroundLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Rotas que NÃO DEVEM ter o background (Instagram Mockups) */}
          <Route path="/invasion-simulation" element={<InvasionSimulationPage />} />
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat/:id" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;