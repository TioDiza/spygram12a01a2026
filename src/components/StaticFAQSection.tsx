import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemData {
  question: string;
  answer: string;
}

interface FAQItemProps {
  data: FAQItemData;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ data, isOpen, onClick }) => (
  <div className="border-b border-gray-700 last:border-b-0">
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full py-4 text-left transition-colors hover:bg-gray-800/50 rounded-md px-2 -mx-2"
    >
      <h3 className="flex items-start gap-2 text-lg font-semibold text-white">
        <HelpCircle className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
        {data.question}
      </h3>
      <ChevronDown 
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : 'rotate-0'}`} 
      />
    </button>
    
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="text-gray-300 ml-7 pb-4 text-sm">{data.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const faqs: FAQItemData[] = [
  { 
    question: 'O pagamento é único ou é uma assinatura?', 
    answer: 'O pagamento é único e vitalício. Você paga apenas uma vez e tem acesso permanente ao perfil invadido.' 
  },
  { 
    question: 'A pessoa que eu invadir vai saber que foi eu?', 
    answer: 'Não. O processo é 100% anônimo e indetectável. Sua identidade é totalmente protegida.' 
  },
  { 
    question: 'Funciona em qualquer celular?', 
    answer: 'Sim. Nosso sistema é baseado na web e funciona perfeitamente em qualquer dispositivo (celular, tablet ou computador) com acesso à internet.' 
  },
  { 
    question: 'O que acontece se não funcionar pra mim?', 
    answer: 'Oferecemos uma Garantia de 7 Dias. Se o acesso falhar ou você não estiver satisfeito, garantimos o reembolso total.' 
  },
  { 
    question: 'Preciso instalar algum aplicativo?', 
    answer: 'Não. Todo o processo é feito online, diretamente pelo seu navegador. Não é necessário baixar ou instalar nada.' 
  },
];

const StaticFAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <CheckCircle className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-white">
          PERGUNTAS FREQUENTES
        </h2>
      </div>
      
      <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            data={faq} 
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default StaticFAQSection;