
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
  </div>
);

export default Loader;
