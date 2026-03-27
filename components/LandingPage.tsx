import React, { useState, useEffect } from 'react';

const circles = [
  { size: 'w-32 h-32', position: 'top-10 left-10', delay: '0s', depth: 0.15 },
  { size: 'w-48 h-48', position: 'top-1/2 -left-20', delay: '3s', depth: 0.5 },
  { size: 'w-24 h-24', position: 'bottom-10 right-10', delay: '6s', depth: 0.85 },
  { size: 'w-40 h-40', position: 'bottom-1/4 -right-10', delay: '9s', depth: 0.3 },
];

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-6 text-text-dark font-sans overflow-hidden gradient-bg">
      {circles.map((circle, index) => {
        // Calculate offset based on mouse position from center of the screen
        const offsetX = (mousePosition.x - window.innerWidth / 2) * -circle.depth / 25;
        const offsetY = (mousePosition.y - window.innerHeight / 2) * -circle.depth / 25;
        
        return (
          // Parallax container
          <div
            key={index}
            className={`absolute transition-transform duration-500 ease-out ${circle.position}`}
            style={{
              transform: `translate(${offsetX}px, ${offsetY}px)`,
            }}
          >
            {/* Floating circle itself */}
            <div
              className={`rounded-full bg-primary-blue/30 animate-float ${circle.size}`}
              style={{
                animationDelay: circle.delay,
              }}
            ></div>
          </div>
        );
      })}

      <div className="relative z-10 text-center flex flex-col items-center max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-medium leading-tight mb-4 tracking-wide">
          Discover Your Inner Healer:
          <br />
          A Nervous System Journey
        </h1>
        <p className="text-lg md:text-xl text-text-light max-w-md mb-10" style={{ lineHeight: 1.7 }}>
          Your nervous system holds the key to your deepest healing. This 3-minute journey reveals patterns you may not consciously recognize.
        </p>
        <button
          onClick={onStart}
          aria-label="Begin Your Journey"
          className="bg-accent text-white py-4 px-12 rounded-full text-lg font-medium shadow-soft hover:shadow-soft-hover hover:-translate-y-1 transition-all duration-300"
        >
          Begin Your Journey
        </button>
        <p className="mt-6 text-sm text-text-light">
          22 questions - ~3 minutes - Based on latest nervous system science
        </p>
      </div>
    </div>
  );
};

export default LandingPage;