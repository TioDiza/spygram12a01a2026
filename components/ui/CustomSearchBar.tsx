import React from 'react';
// SearchIcon removido conforme solicitado

interface CustomSearchBarProps {
  query: string; // Recebe o query como prop
  setQuery: (query: string) => void; // Recebe a função para atualizar o query
  isLoading: boolean;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ query, setQuery, isLoading }) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      // A ação de pesquisa será disparada pelo SparkleButton, não pelo Enter aqui
      // Mas podemos manter a prevenção de default para evitar submissão de formulário
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove o caractere '@' da entrada do usuário
    const sanitizedValue = e.target.value.replace(/@/g, '');
    setQuery(sanitizedValue); // Atualiza o estado do query no App.tsx
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md mx-auto flex justify-center items-center">
      <label className="relative block w-[350px] flex rounded-full border-2 border-[#373737] py-[15px] px-4"> {/* Ajustado padding para px-4 */}
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'Searching...' : 'Ex: neymarjr (sem @)'}
          className="bg-transparent outline-none border-none text-[#c5c5c5] text-base w-full text-center focus:outline-none" // Adicionado text-center e removido pr-8
          disabled={isLoading}
        />
        {/* Ícone de pesquisa removido */}
      </label>
    </form>
  );
};

export default CustomSearchBar;