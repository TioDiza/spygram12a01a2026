import React from 'react';
import { ShieldCheck, Coins, Zap, Infinity, Star } from 'lucide-react';
import SparkleButton from '../components/ui/SparkleButton'; 
import toast from 'react-hot-toast'; // Importa o toast

interface CreditPackage {
  id: number;
  amount: number | string;
  title: string;
  price: string;
  description: string;
  checkoutUrl: string;
  icon: React.ElementType;
  highlight?: boolean;
}

const CreditsPage: React.FC = () => {
  const creditPackages: CreditPackage[] = [
    {
      id: 1,
      amount: 10,
      title: "10 Créditos",
      price: "R$ 49,50",
      description: "Créditos imediatos após confirmação.",
      checkoutUrl: "https://checkout.perfectpay.com.br/pay/PPU38COTFU1",
      icon: Zap,
    },
    {
      id: 2,
      amount: 30,
      title: "30 Créditos",
      price: "R$ 79,50",
      description: "Melhor custo-benefício mensal.",
      checkoutUrl: "https://checkout.perfectpay.com.br/pay/PPU38COTFU6",
      icon: Star,
      highlight: true,
    },
    {
      id: 3,
      amount: "Ilimitados",
      title: "Créditos Ilimitados",
      price: "R$ 149,00",
      description: "Uso sem limites permanentemente.",
      checkoutUrl: "https://checkout.perfectpay.com.br/pay/PPU38COTFU8",
      icon: Infinity,
    },
  ];

  const handleCardClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleInvadeClick = () => {
    toast.error("Você está sem créditos, realize uma recarga pra conseguir invadir uma conta");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 sm:p-8 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <img src="/spygram_transparentebranco.png" alt="SpyGram Logo" className="h-8" />
          <span className="text-xl font-bold">SpyGram</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Créditos: 0</span>
          <span className="text-gray-400 text-sm">@user-403</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto text-center">
        <Coins className="w-20 h-20 text-purple-400 mb-6" />
        <h1 className="text-4xl font-extrabold text-white mb-4">Comprar Créditos</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Escolha o pacote de créditos que melhor se adapta às suas necessidades e comece a invadir perfis agora mesmo!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handleCardClick(pkg.checkoutUrl)}
              className={`relative bg-gray-900/70 backdrop-blur-sm border rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-300 cursor-pointer active:scale-[0.98]
                ${pkg.highlight ? 'border-purple-500 shadow-purple-500/30 scale-105' : 'border-gray-700 shadow-purple-500/10'}`}
            >
              {pkg.highlight && (
                <span className="absolute -top-3 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-md">
                  MAIS POPULAR
                </span>
              )}
              <pkg.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">{pkg.title}</h2>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-transparent bg-clip-text mb-4">
                {pkg.price}
              </p>
              <p className="text-gray-300 text-sm mb-6 flex-1">{pkg.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 w-full max-w-xs"> {/* Adicionado um contêiner para o botão */}
          <SparkleButton onClick={handleInvadeClick}>
            Realizar invasão
          </SparkleButton>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center mt-auto py-8">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 rounded-full text-sm mb-2">
          <ShieldCheck className="w-4 h-4 text-red-400" />
          <span>Cadeado Site Seguro - SSL Verificado</span>
        </div>
        <p className="text-gray-500 text-xs">Todos os direitos reservados a SpyGram</p>
      </footer>
    </div>
  );
};

export default CreditsPage;