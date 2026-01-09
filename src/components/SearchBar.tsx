import React, { useState } from 'react';
import SearchIcon from './icons/SearchIcon'; // Caminho permanece correto

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative flex items-center w-full bg-gray-900 rounded-full">
          <div className="pl-6 pr-2 pointer-events-none">
            <SearchIcon className="w-6 h-6 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            placeholder="Enter Instagram username..."
            className="w-full py-4 pl-2 pr-6 text-lg text-white bg-transparent border-none appearance-none focus:outline-none focus:ring-0"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="m-1.5 px-6 py-2.5 text-white font-semibold rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;