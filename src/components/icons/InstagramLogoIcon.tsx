import React from 'react';

const InstagramLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <img
      src="/icons/logo-notification.png"
      alt="Instagram Logo"
      className={`object-cover ${className}`}
    />
  );
};

export default InstagramLogoIcon;