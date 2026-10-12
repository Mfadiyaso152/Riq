import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        {/* Geometric Folded Leaf SVG */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto drop-shadow-sm"
        >
          {/* Back Dark Green Fold */}
          <path
            d="M36 8L24 16L12 8C12 8 18 2 24 2C30 2 36 8 36 8Z"
            fill="#173F35"
          />
          {/* Main Dark Green Body */}
          <path
            d="M36 8V32C36 32 30 42 24 46C18 42 12 32 12 32V8L24 16L36 8Z"
            fill="#173F35"
          />
          {/* Folded Lime Flap */}
          <path
            d="M24 16L36 8C36 8 30 2 24 2C18 2 12 8 12 8L24 16Z"
            fill="#D9EF83"
          />
          <path
            d="M24 16V46C30 42 36 32 36 32V8L24 16Z"
            fill="#173F35"
            fillOpacity="0.15"
          />
        </svg>
      </div>
      {showText && (
        <span className="font-extrabold text-2xl tracking-tight text-[#173F35]">
          رَقّ
        </span>
      )}
    </div>
  );
};
