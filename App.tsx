import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import { calculateResults } from './services/quizService';
import type { QuizProgress, QuizResults } from './types';
import { questions } from './constants';
import { useQuizProgress } from './hooks/useQuizProgress';

type GameState = 'landing' | 'quiz' | 'results' | 'resume_prompt';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('landing');
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<QuizResults | null>(null);
  const { savedProgress, saveProgress, clearProgress } = useQuizProgress();

  // Check for saved progress on mount
  useEffect(() => {
    if (savedProgress && savedProgress.answers.length < questions.length) {
      setAnswers(savedProgress.answers);
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
      setGameState('resume_prompt');
    }
  }, [savedProgress]);

  const startQuiz = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    clearProgress();
    setGameState('quiz');
  };

  const resumeQuiz = () => {
    setGameState('quiz');
  };

  const handleAnswerSelect = (answerValue: number) => {
    const newAnswers = [...answers, answerValue];
    setAnswers(newAnswers);

    const progress: QuizProgress = {
      currentQuestionIndex: currentQuestionIndex + 1,
      answers: newAnswers,
      timestamp: Date.now(),
    };
    saveProgress(progress);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalResults = calculateResults(newAnswers);
      setResults(finalResults);
      setGameState('results');
      clearProgress();
    }
  };

  const ResumePrompt = () => (
    <div className="gradient-bg w-full min-h-screen flex items-center justify-center p-6 text-text-dark font-sans">
      <div className="text-center bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-soft max-w-md w-full">
        <h2 className="text-2xl md:text-3xl font-medium mb-4">Welcome back.</h2>
        <p className="text-lg text-text-light mb-8">Would you like to continue your journey from where you left off?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resumeQuiz}
            className="w-full sm:w-auto bg-accent text-white py-3 px-10 rounded-full text-lg font-medium shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            Continue Journey
          </button>
          <button
            onClick={startQuiz}
            className="w-full sm:w-auto bg-white text-accent py-3 px-10 rounded-full text-lg font-medium border-2 border-accent shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (gameState) {
      case 'landing':
        return <LandingPage onStart={startQuiz} />;
      case 'resume_prompt':
        return <ResumePrompt />;
      case 'quiz':
        return <QuizPage
          currentQuestionIndex={currentQuestionIndex}
          onAnswerSelect={handleAnswerSelect}
        />;
      case 'results':
        return results ? <ResultsPage results={results} /> : <div>Calculating results...</div>;
      default:
        return <LandingPage onStart={startQuiz} />;
    }
  };

  return <div className="antialiased">{renderContent()}</div>;
};

export default App;
