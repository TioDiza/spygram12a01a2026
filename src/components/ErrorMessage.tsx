
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="mt-8 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
    <p className="font-bold">Error</p>
    <p className="text-sm">{message}</p>
  </div>
);

export default ErrorMessage;
