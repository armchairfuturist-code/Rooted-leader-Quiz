import { useState, useCallback } from 'react';
import type { QuizProgress } from '../types';

const STORAGE_KEY = 'nervousSystemQuiz_progress';
const MAX_AGE_HOURS = 24;

export function useQuizProgress() {
  const [savedProgress, setSavedProgress] = useState<QuizProgress | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data: QuizProgress = JSON.parse(raw);
      const hoursSince = (Date.now() - data.timestamp) / 3600000;
      if (hoursSince < MAX_AGE_HOURS && data.answers.length > 0) {
        return data;
      }
    } catch {
      // Corrupted data — ignore
    }
    localStorage.removeItem(STORAGE_KEY);
    return null;
  });

  const saveProgress = useCallback((progress: QuizProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, []);

  const clearProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedProgress(null);
  }, []);

  return { savedProgress, saveProgress, clearProgress };
}
