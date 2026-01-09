"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="bottom-left" // Alterado para 'bottom-left'
      toastOptions={{
        duration: 4000, // Duração padrão de 4 segundos
        style: {
          background: '#333',
          color: '#fff',
        },
        success: {
          style: {
            background: '#4CAF50',
            color: '#fff',
          },
        },
        error: {
          style: {
            background: '#F44336',
            color: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;