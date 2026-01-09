import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Importa o hook useAuth

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa o hook useAuth para acessar a função login

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const correctUsername = 'user403@spygram.com';
    const correctPassword = 'spygram1234';

    if (username.trim() === '' || password.trim() === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (username === correctUsername && password === correctPassword) {
      console.log('Login bem-sucedido!');
      login(); // Chama a função login do contexto
      navigate('/servers'); // Redireciona para a página de servidores
    } else {
      setError('Nome de usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <header className="absolute top-4 left-4 flex items-center gap-2">
        <img src="/spygram_transparentebranco.png" alt="SpyGram Logo" className="h-8" />
        <span className="text-xl font-bold">SpyGram</span>
      </header>

      <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg shadow-purple-500/10 p-8 w-full max-w-md flex flex-col items-center">
        <img src="/spygram_transparentebranco.png" alt="SpyGram Logo" className="h-20 mb-4" />
        <h2 className="text-3xl font-bold mb-2 text-white">LOGIN</h2>
        <p className="text-gray-400 text-sm mb-6">Insira seu nome de usuário e senha</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="NOME DE USUÁRIO"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 uppercase text-sm"
          />
          <input
            type="password"
            placeholder="SENHA"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 uppercase text-sm"
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-lg
                       bg-gradient-to-r from-red-600 to-pink-700
                       transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 active:scale-95"
          >
            ENTRAR
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-xs">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Site Seguro</span>
          </div>
          <p>Todos os direitos reservados a SpyGram</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;