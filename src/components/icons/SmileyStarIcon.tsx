import React from 'react';

const SmileyStarIcon: React.FC<{ size?: number; strokeWidth?: number; className?: string; onClick?: () => void; }> = ({ size = 28, strokeWidth = 1.5, className, onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M12 2.25C12 2.25 13.5 6 18 6.75C18 6.75 21.75 8.25 21.75 12C21.75 12 21.75 15.75 18 17.25C18 17.25 13.5 18 12 21.75C12 21.75 10.5 18 6 17.25C6 17.25 2.25 15.75 2.25 12C2.25 12 2.25 8.25 6 6.75C6 6.75 10.5 6 12 2.25Z" />
    <path d="M9.5 10C9.5 10.2761 9.72386 10.5 10 10.5C10.2761 10.5 10.5 10.2761 10.5 10C10.5 9.72386 10.2761 9.5 10 9.5C9.72386 9.5 9.5 9.72386 9.5 10Z" fill="currentColor" />
    <path d="M13.5 10C13.5 10.2761 13.7239 10.5 14 10.5C14.2761 10.5 14.5 10.2761 14.5 10C14.5 9.72386 14.2761 9.5 14 9.5C13.7239 9.5 13.5 9.72386 13.5 10Z" fill="currentColor" />
    <path d="M15 14C15 14 14 15 12 15C10 15 9 14 9 14" />
  </svg>
);

export default SmileyStarIcon;