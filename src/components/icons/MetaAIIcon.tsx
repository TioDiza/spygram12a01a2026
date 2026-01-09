import React from 'react';

const MetaAIIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="meta-ai-gradient" x1="0" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FA11F7" />
        <stop offset="0.5" stopColor="#871EEA" />
        <stop offset="1" stopColor="#132BED" />
      </linearGradient>
    </defs>
    <circle cx="10" cy="10" r="9" stroke="url(#meta-ai-gradient)" strokeWidth="2" />
  </svg>
);

export default MetaAIIcon;