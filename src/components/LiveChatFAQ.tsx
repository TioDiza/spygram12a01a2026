import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MessageSquare, User, ShieldCheck, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessageProps {
  sender: 'user' | 'admin' | 'current_user'; // Novo tipo para o usuário atual
  message: string;
  time: string;
  username?: string;
}

// Mapeamento de cores para usernames simulados
const USER_COLORS: { [key: string]: string } = {
  'user921': 'text-yellow-400',
  'user333': 'text-pink-400',
  'user403': 'text-blue-400',
  'user111': 'text-green-400',
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, message, time, username }) => {
  const isCurrentUser = sender === 'current_user';
  const isAdmin = sender === 'admin';
  
  // Classes de posicionamento e bolha
  let alignmentClasses = 'items-start';
  let bubbleClasses = 'bg-gray-700 text-white rounded-tl-none';
  let avatarComponent = isAdmin 
    ? <ShieldCheck className="w-4 h-4 text-green-400" />
    : <User className="w-4 h-4 text-white" />;
  let nameDisplay = isAdmin ? 'Admin SpyGram' : username;
  let nameColor = isAdmin ? 'text-green-400' : USER_COLORS[username || ''] || 'text-gray-400';

  if (isCurrentUser) {
    alignmentClasses = 'items-end';
    bubbleClasses = 'bg-purple-600 text-white rounded-br-none';
    avatarComponent = <User className="w-4 h-4 text-white" />; // Avatar do usuário atual
    nameDisplay = 'Você';
    nameColor = 'text-white';
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col max-w-[85%] mb-3 ${alignmentClasses}`}
    >
      {/* Header (Nome e Avatar) - Apenas para mensagens que não são do usuário atual */}
      {!isCurrentUser && (
        <div className="flex items-center text-xs mb-1">
          <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center border border-gray-600 mr-2">
            {avatarComponent}
          </div>
          <span className={`font-semibold ${nameColor}`}>
            {nameDisplay}
          </span>
        </div>
      )}
      
      {/* Bolha da Mensagem */}
      <div className="flex items-end gap-2">
        {/* Tempo à esquerda para mensagens à esquerda */}
        {!isCurrentUser && <span className="text-xs text-gray-500">{time}</span>}
        
        <div className={`px-4 py-2 rounded-xl text-sm shadow-md ${bubbleClasses}`}>
          {message}
        </div>
        
        {/* Tempo à direita para mensagens à direita */}
        {isCurrentUser && <span className="text-xs text-gray-500">{time}</span>}
      </div>
    </motion.div>
  );
};

const INITIAL_CONVERSATION: ChatMessageProps[] = [
    { sender: 'user', username: 'user921', message: 'O acesso é realmente vitalício?', time: '14:30' },
    { sender: 'admin', message: 'Sim! O acesso é permanente. Você paga uma única vez e tem acesso ao perfil invadido para sempre.', time: '14:31' },
    { sender: 'user', username: 'user333', message: 'Aceita PIX? Preciso de acesso rápido.', time: '14:32' },
    { sender: 'admin', message: 'Com certeza! Aceitamos PIX, Cartão de Crédito e Boleto. O acesso é liberado imediatamente após a confirmação do pagamento.', time: '14:33' },
    { sender: 'user', username: 'user921', message: 'É seguro? Posso ser rastreado?', time: '14:34' },
    { sender: 'admin', message: 'Absolutamente seguro. Utilizamos criptografia de ponta e servidores proxy anônimos. Sua identidade é 100% protegida.', time: '14:35' },
    { sender: 'user', username: 'user403', message: 'E se eu não gostar do que encontrar?', time: '14:36' },
    { sender: 'admin', message: 'Oferecemos uma garantia de 7 dias. Se não estiver satisfeito, basta solicitar o reembolso total.', time: '14:37' },
];

const LiveChatFAQ: React.FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref para o contêiner de rolagem
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessageProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationFinished, setConversationFinished] = useState(false);

  // Efeito para simular a conversa inicial
  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;

    const addMessage = () => {
      if (index < INITIAL_CONVERSATION.length) {
        const msg = INITIAL_CONVERSATION[index];
        
        // Simula o admin digitando antes de responder
        if (msg.sender === 'admin') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setDisplayedMessages(prev => [...prev, msg]);
            index++;
            timer = setTimeout(addMessage, 1500); // Próxima mensagem após 1.5s
          }, 1000); // Admin digita por 1s
        } else {
          setDisplayedMessages(prev => [...prev, msg]);
          index++;
          timer = setTimeout(addMessage, 1500); // Próxima mensagem após 1.5s
        }
      } else {
        setConversationFinished(true);
      }
    };

    // Inicia a conversa após um pequeno atraso
    timer = setTimeout(addMessage, 500);

    return () => clearTimeout(timer);
  }, []);

  // Efeito para rolar automaticamente para o final do chat, SOMENTE se o usuário estiver perto do final
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      // Define um limite de 50px
      const THRESHOLD = 50;
      
      // Calcula a distância máxima de rolagem
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      
      // Verifica se o usuário está a 50px ou menos do final
      const isNearBottom = maxScrollTop - container.scrollTop <= THRESHOLD;

      if (isNearBottom) {
        // Rola diretamente para o final
        container.scrollTop = maxScrollTop;
      }
    }
  }, [displayedMessages]);

  const handleQuestionClick = useCallback((question: string) => {
    if (!conversationFinished) return; // Não permite interação antes da conversa inicial terminar

    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    // 1. Adiciona a pergunta do usuário
    const userQuestion: ChatMessageProps = {
      sender: 'current_user',
      message: question,
      time: now,
    };
    setDisplayedMessages(prev => [...prev, userQuestion]);

    // 2. Simula a resposta do admin
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let responseMessage = 'Obrigado pela sua pergunta! Para mais detalhes, clique no botão de acesso completo.';
      
      if (question.includes('PIX')) {
        responseMessage = 'Sim, aceitamos PIX! É a forma mais rápida de liberar seu acesso imediatamente.';
      } else if (question.includes('seguro')) {
        responseMessage = 'É 100% seguro. Sua transação é protegida e sua identidade é anônima.';
      } else if (question.includes('imediato')) {
        responseMessage = 'O acesso é liberado em menos de 5 minutos após a confirmação do pagamento.';
      }

      const adminResponse: ChatMessageProps = {
        sender: 'admin',
        message: responseMessage,
        time: now,
      };
      setDisplayedMessages(prev => [...prev, adminResponse]);
    }, 2000); // Admin responde após 2 segundos
  }, [conversationFinished]);

  const commonQuestions = [
    'Aceita PIX?',
    'É seguro comprar?',
    'O acesso é imediato?',
  ];

  return (
    <div className="mt-12 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <MessageSquare className="w-6 h-6 text-pink-500" />
        <h2 className="text-xl font-bold text-white">
          CHAT AO VIVO (FAQ)
        </h2>
      </div>
      
      {/* Área de Mensagens */}
      <div 
        ref={chatContainerRef} // Adiciona o ref ao contêiner de rolagem
        className="bg-gray-900/70 border border-gray-700 rounded-xl p-4 h-[400px] overflow-y-auto flex flex-col"
      >
        {displayedMessages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
        
        {/* Mensagem de status do Admin */}
        {isTyping && (
          <div className="text-center text-xs text-gray-500 mt-4">
            Admin SpyGram está digitando...
          </div>
        )}
      </div>

      {/* Campo de Digitação Simulada */}
      <div className="mt-4 p-3 bg-gray-900/70 border border-gray-700 rounded-xl flex items-center">
        <input
          type="text"
          placeholder="Digite sua pergunta..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
          readOnly // Mantido como readOnly para simulação
        />
        <button className="ml-3 p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors cursor-pointer">
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Perguntas Frequentes (Botões) */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {commonQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionClick(question)}
            disabled={!conversationFinished} // Desabilita enquanto a conversa inicial não termina
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              conversationFinished 
                ? 'text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700'
                : 'text-gray-500 bg-gray-900 border border-gray-800 cursor-not-allowed'
            }`}
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LiveChatFAQ;