import React from 'react';

const InstagramAppIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <div className={`relative rounded-lg overflow-hidden flex-shrink-0 ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600"></div>
      
      {/* Camera Glyph */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer square of camera */}
        <div className="w-3/5 h-3/5 rounded-xl border-2 border-white flex items-center justify-center">
          {/* Lens circle */}
          <div className="w-1/2 h-1/2 rounded-full border-2 border-white"></div>
        </div>
        {/* Flash dot */}
        <div className="absolute top-[25%] right-[25%] w-1 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default InstagramAppIcon;