
import type { QuizResults, CategoryScores } from '../types';
import { questions } from '../constants';

export function calculateResults(answers: number[]): QuizResults {
  // Total dysregulation score
  const totalScore = answers.reduce((sum, answer, index) => {
    const question = questions[index];
    const score = question.reverse_score ? (4 - answer) : answer;
    return sum + score;
  }, 0);

  // Category-specific scores
  const categoryScores: CategoryScores = {
    interoception: 0,
    dorsal_vagal: 0,
    sympathetic: 0,
    window_tolerance: 0,
    social_engagement: 0,
    fawn_response: 0,
    self_compassion: 0,
    ventral_vagal_deficit: 0
  };

  answers.forEach((answer, index) => {
    const question = questions[index];
    const score = question.reverse_score ? (4 - answer) : answer;
    if (question.category in categoryScores) {
        (categoryScores as any)[question.category] += score;
    }
  });
  
  // Determine dominant pattern
  let dominantPattern = "Regulated";
  let patternDescription = "";
  let patternIcon = "🌿";

  if (totalScore >= 0 && totalScore <= 22) {
    dominantPattern = "The Resilient Navigator";
    patternDescription = "Your nervous system shows strong regulation and flexibility. You have a wide window of tolerance and can navigate stress with resilience.";
    patternIcon = "🌿";
  } else if (totalScore >= 23 && totalScore <= 44) {
    if (categoryScores.sympathetic > categoryScores.dorsal_vagal) {
      dominantPattern = "The Vigilant Guardian";
      patternDescription = "Your nervous system has been working overtime to keep you safe, often leaving you in a state of heightened alertness and activation. This isn't weakness – it's your body's intelligent response to overwhelm.";
      patternIcon = "⚡";
    } else if (categoryScores.dorsal_vagal > categoryScores.sympathetic) {
      dominantPattern = "The Quiet Retreater";
      patternDescription = "Your nervous system tends to withdraw and shut down when overwhelmed, creating feelings of numbness or disconnection. This is your system's way of protecting you.";
      patternIcon = "🌙";
    } else {
      dominantPattern = "The Sensitive Empath";
      patternDescription = "Your nervous system has a narrow window of tolerance, making you highly attuned to subtle energies but also more easily overwhelmed.";
      patternIcon = "🦋";
    }
  } else if (totalScore >= 45 && totalScore <= 66) {
    if (categoryScores.interoception >= 8) {
      dominantPattern = "The Disconnected Achiever";
      patternDescription = "You've learned to push through by disconnecting from your body's signals. Your mind drives forward while your body tries to slow you down.";
      patternIcon = "🎭";
    } else if (categoryScores.social_engagement >= 10) {
      dominantPattern = "The Isolated Seeker";
      patternDescription = "Your nervous system struggles to feel safe in connection, even when you deeply desire it. Trust feels like a risk your system won't allow.";
      patternIcon = "🌑";
    } else {
      dominantPattern = "The Adaptive Survivor";
      patternDescription = "Your nervous system has developed complex strategies to manage ongoing dysregulation. You've been surviving, but you're ready to thrive.";
      patternIcon = "🌊";
    }
  } else { // 67-88
    dominantPattern = "The Awakening Healer";
    patternDescription = "Your nervous system is showing you that deep healing is needed and possible. You're recognizing patterns that have kept you protected but also limited.";
    patternIcon = "🔥";
  }

  return {
    totalScore,
    categoryScores,
    dominantPattern,
    patternDescription,
    patternIcon
  };
}
