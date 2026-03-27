import React, { useState, useEffect } from 'react';
import { questions, answerOptions, getMicroAffirmation } from '../constants';
import BreathingAnimation from './BreathingAnimation';
import ProgressBar from './ProgressBar';

interface QuizPageProps {
  currentQuestionIndex: number;
  onAnswerSelect: (answerValue: number) => void;
}

const QuizPage: React.FC<QuizPageProps> = ({ currentQuestionIndex, onAnswerSelect }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  const question = questions[currentQuestionIndex];
  
  useEffect(() => {
    // On new question, fade in
    setFadeState('in');
  }, [currentQuestionIndex]);

  const handleAnswerClick = (value: number) => {
    if (isTransitioning) return;
    
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    setSelectedAnswer(value);
    setIsTransitioning(true);
    setFadeState('out');

    setTimeout(() => {
      onAnswerSelect(value);
      setSelectedAnswer(null);
      // Fade-in will be triggered by useEffect on currentQuestionIndex change
    }, 500); // Wait for fade out
    
    setTimeout(() => {
        setIsTransitioning(false);
    }, 1300); // Full transition duration
  };
  
  const formattedQuestionText = () => {
    const text = question.text;
    // FIX: Explicitly type arrays to avoid type inference issues where an empty array could be typed as `never[]`.
    const keyPhrases: string[] = text.match(/('[^']+')|(\([^\)]+\))/g) || [];
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];

    keyPhrases.forEach((phrase, index) => {
      const startIndex = text.indexOf(phrase, lastIndex);
      if (startIndex > lastIndex) {
        parts.push(<span key={`text-${index}`}>{text.substring(lastIndex, startIndex)}</span>);
      }
      parts.push(<strong key={`phrase-${index}`} className="font-medium text-text-dark">{phrase}</strong>);
      lastIndex = startIndex + phrase.length;
    });

    if (lastIndex < text.length) {
      parts.push(<span key="text-last">{text.substring(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="gradient-bg w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-text-dark font-sans overflow-hidden">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-grow">
        {/* Header */}
        <header className="py-4 w-full">
            <div className="flex justify-between items-center">
                <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                <div className="text-right">
                    <p className="text-sm font-medium text-accent">{`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
                    <p className="text-sm text-text-light italic">{getMicroAffirmation(currentQuestionIndex)}</p>
                </div>
            </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center">
            <div className={`w-full text-center transition-opacity duration-500 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className="text-xl md:text-2xl text-text-dark mb-10 leading-relaxed max-w-xl mx-auto tracking-wide animate-gentle-pulse" style={{ letterSpacing: '0.3px', lineHeight: '1.7' }}>
                  {formattedQuestionText()}
                </h2>
                <div className="space-y-3 max-w-md mx-auto">
                {answerOptions.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={isTransitioning}
                        aria-pressed={selectedAnswer === index}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 ${!isTransitioning ? 'animate-gentle-sway' : ''}
                        ${
                            selectedAnswer === index
                            ? 'bg-primary-blue border-accent text-text-dark scale-102 shadow-answer-selected'
                            : 'bg-white border-primary-blue text-text-dark hover:bg-primary-blue/20 hover:translate-x-1'
                        }
                        ${ isTransitioning && selectedAnswer !== index ? 'opacity-50' : ''}
                        `}
                        style={!isTransitioning ? { animationDelay: `${index * 200}ms` } : {}}
                    >
                        {option}
                    </button>
                ))}
                </div>
            </div>
        </main>
      </div>

      {isTransitioning && <BreathingAnimation />}
    </div>
  );
};

export default QuizPage;