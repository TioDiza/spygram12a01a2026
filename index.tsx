import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ToastProvider from './src/components/ToastProvider';
import { AuthProvider } from './src/context/AuthContext'; // Importa AuthProvider

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Envolve o App com AuthProvider */}
      <ToastProvider />
      <App />
    </AuthProvider>
  </React.StrictMode>
);