
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="relative w-12 h-16">
      <svg viewBox="0 0 100 125" className="absolute top-0 left-0 w-full h-full text-primary-blue/30 fill-current">
        <path d="M50 0 C0 50 0 75 50 125 C100 75 100 50 50 0 Z" />
      </svg>
      <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden" style={{ clipPath: 'path("M50 0 C0 50 0 75 50 125 C100 75 100 50 50 0 Z")' }}>
        <div
          className="absolute bottom-0 left-0 w-full bg-primary-blue transition-all duration-500 ease-in-out"
          style={{ height: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
