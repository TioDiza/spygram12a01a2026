import React from 'react';
import MatrixRainBackground from './MatrixRainBackground';

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({ children }) => {
  return (
    <>
      <MatrixRainBackground />
      {children}
    </>
  );
};

export default BackgroundLayout;