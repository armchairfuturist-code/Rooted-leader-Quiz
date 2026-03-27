import type { QuizResults, CategoryScores, PathRecommendation } from '../types';
import { questions } from '../constants';

const BASE_URL = 'https://theintegrativepractitioner.com';

const pathRecommendations: Record<string, PathRecommendation> = {
  "The Resilient Navigator": { pathId: 'path-1', pathLabel: 'Path 1', pathTitle: 'Clarity & Assessment', pathEmoji: '🧭', description: "You're already regulated. Start with a clarity session to map your nervous system.", whyThisPath: 'Your nervous system is well-regulated. A strategic assessment will help you identify your next direction.', pathUrl: `${BASE_URL}/#path-1` },
  "The Vigilant Guardian": { pathId: 'path-2', pathLabel: 'Path 2', pathTitle: 'Somatic Healing', pathEmoji: '🌿', description: 'Your nervous system is working overtime. Time to release trapped survival energy.', whyThisPath: 'High sympathetic activation needs discharge through somatic experiencing.', pathUrl: `${BASE_URL}/#path-2` },
  "The Quiet Retreater": { pathId: 'path-2', pathLabel: 'Path 2', pathTitle: 'Somatic Healing', pathEmoji: '🌿', description: 'Your nervous system has learned to withdraw. Gentle somatic work helps reconnection.', whyThisPath: "Dorsal vagal shutdown is your body's way of conserving energy. We'll expand your window of tolerance.", pathUrl: `${BASE_URL}/#path-2` },
  "The Sensitive Empath": { pathId: 'path-2', pathLabel: 'Path 2', pathTitle: 'Somatic Healing', pathEmoji: '🌿', description: 'You have a narrow window of tolerance. Expanding that container is the work.', whyThisPath: 'Your sensitivity needs support. We gently expand your capacity.', pathUrl: `${BASE_URL}/#path-2` },
  "The Disconnected Achiever": { pathId: 'path-5', pathLabel: 'Path 5', pathTitle: 'Mentorship', pathEmoji: '👑', description: "You've mastered achievement at the cost of embodiment. Reconnecting mind and body is the work.", whyThisPath: 'Mind-body integration AND strategic design. Mentorship weaves somatic awareness with leadership.', pathUrl: `${BASE_URL}/#path-5` },
  "The Isolated Seeker": { pathId: 'path-3', pathLabel: 'Path 3', pathTitle: 'Integration Support', pathEmoji: '✨', description: 'Connection feels risky. Healing the social engagement system opens the door.', whyThisPath: 'Integration work includes co-regulation practices for connection safety.', pathUrl: `${BASE_URL}/#path-3` },
  "The Adaptive Survivor": { pathId: 'path-2', pathLabel: 'Path 2', pathTitle: 'Somatic Healing', pathEmoji: '🌿', description: "You've developed complex adaptations. It's time to simplify and stabilize.", whyThisPath: 'Complex patterns need graduated somatic work at the foundation.', pathUrl: `${BASE_URL}/#path-2` },
  "The Awakening Healer": { pathId: 'path-2', pathLabel: 'Path 2', pathTitle: 'Somatic Healing', pathEmoji: '🌿', description: 'You recognize deep patterns need support. Nervous system healing is the foundation.', whyThisPath: 'Profound healing requires a solid nervous system foundation.', pathUrl: `${BASE_URL}/#path-2` }
};

export function calculateResults(answers: number[]): QuizResults {
  const totalScore = answers.reduce((sum, answer, index) => {
    const question = questions[index];
    return sum + (question.reverse_score ? (4 - answer) : answer);
  }, 0);

  const categoryScores: CategoryScores = { interoception: 0, dorsal_vagal: 0, sympathetic: 0, window_tolerance: 0, social_engagement: 0, fawn_response: 0, self_compassion: 0, ventral_vagal_deficit: 0 };
  
  answers.forEach((answer, index) => {
    const question = questions[index];
    const score = question.reverse_score ? (4 - answer) : answer;
    (categoryScores as any)[question.category] += score;
  });
  
  let dominantPattern = "Regulated", patternDescription = "", patternIcon = "🌿";

  if (totalScore <= 22) {
    dominantPattern = "The Resilient Navigator";
    patternDescription = "Your nervous system shows strong regulation and flexibility. You have a wide window of tolerance and can navigate stress with resilience.";
    patternIcon = "🌿";
  } else if (totalScore <= 44) {
    if (categoryScores.sympathetic > categoryScores.dorsal_vagal) {
      dominantPattern = "The Vigilant Guardian";
      patternDescription = "Your nervous system has been working overtime to keep you safe, often leaving you in a state of heightened alertness.";
      patternIcon = "⚡";
    } else if (categoryScores.dorsal_vagal > categoryScores.sympathetic) {
      dominantPattern = "The Quiet Retreater";
      patternDescription = "Your nervous system tends to withdraw and shut down when overwhelmed, creating feelings of numbness or disconnection.";
      patternIcon = "🌙";
    } else {
      dominantPattern = "The Sensitive Empath";
      patternDescription = "Your nervous system has a narrow window of tolerance, making you highly attuned but also more easily overwhelmed.";
      patternIcon = "🦋";
    }
  } else if (totalScore <= 66) {
    if (categoryScores.interoception >= 8) {
      dominantPattern = "The Disconnected Achiever";
      patternDescription = "You've learned to push through by disconnecting from your body's signals. Your mind drives forward while your body slows you down.";
      patternIcon = "🎭";
    } else if (categoryScores.social_engagement >= 10) {
      dominantPattern = "The Isolated Seeker";
      patternDescription = "Your nervous system struggles to feel safe in connection, even when you deeply desire it.";
      patternIcon = "🌑";
    } else {
      dominantPattern = "The Adaptive Survivor";
      patternDescription = "Your nervous system has developed complex strategies to manage dysregulation. You've been surviving, but you're ready to thrive.";
      patternIcon = "🌊";
    }
  } else {
    dominantPattern = "The Awakening Healer";
    patternDescription = "Your nervous system is showing you that deep healing is needed. You're recognizing patterns that have kept you protected but also limited.";
    patternIcon = "🔥";
  }

  return { totalScore, categoryScores, dominantPattern, patternDescription, patternIcon, recommendedPath: pathRecommendations[dominantPattern] };
}
