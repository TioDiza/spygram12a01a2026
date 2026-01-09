import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, RefreshCw } from 'lucide-react';

const GuaranteeBanner: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 p-4 text-center w-full max-w-md mx-auto relative" // Estilo de card removido
    >
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <ShieldCheck className="w-12 h-12 text-green-500" /> {/* Aumentado */}
          <h2 className="text-4xl font-extrabold text-white uppercase"> {/* Aumentado */}
            GARANTIA TOTAL
          </h2>
          <RefreshCw className="w-12 h-12 text-green-500 animate-spin-slow" /> {/* Aumentado */}
        </div>

        <p className="text-2xl text-gray-200 mb-4 font-medium"> {/* Aumentado */}
          Se você não gostar do que encontrar, ou se o acesso falhar:
        </p>
        
        {/* Destaque da Garantia */}
        <div className="inline-block p-6 border-4 border-green-600 rounded-xl bg-black/50 shadow-lg shadow-green-500/20"> {/* Aumentado padding e borda */}
          <span className="text-6xl font-extrabold text-green-400 block leading-none"> {/* Aumentado */}
            7 DIAS
          </span>
          <span className="text-xl text-green-300 block mt-2 font-semibold">DE REEMBOLSO GARANTIDO</span> {/* Aumentado */}
        </div>

        <p className="text-lg text-yellow-300 mt-6 font-semibold"> {/* Aumentado */}
          Sua satisfação é nossa prioridade. Compre com total tranquilidade.
        </p>
      </div>
    </motion.div>
  );
};

export default GuaranteeBanner;