import React from 'react';

const BreathingAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-cream/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative w-40 h-40 md:w-52 md:h-52">
        <div className="absolute inset-0 rounded-full border-4 border-primary-blue breathing-circle-exhale" style={{ animationIterationCount: 1 }}></div>
        <div className="absolute inset-0 rounded-full border-4 border-secondary-blue breathing-circle-inhale" style={{ animationDelay: '0.7s', animationIterationCount: 1, transform: 'scale(0.5)' }}></div>
      </div>
    </div>
  );
};

export default BreathingAnimation;