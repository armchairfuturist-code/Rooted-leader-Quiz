import type { QuizResults, CategoryScores, PathRecommendation } from '../types';
import { questions } from '../constants';

const BASE_URL = 'https://theintegrativepractitioner.com';

// Every route through this assessment ends at the same door. The site treats
// The Clarity Call as the universal gate: offers are made after it, never
// before. The archetype shapes the explanation, not the destination, and the
// link points at a section that exists on the live site.
const pathRecommendations: Record<string, PathRecommendation> = {
  "The Resilient Navigator": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F9ED}', description: 'You are already well regulated. One working session maps where that capacity should go next.', whyThisPath: 'A wide window of tolerance is not the problem. Choosing what to build with it is.', pathUrl: `${BASE_URL}/#services` },
  "The Vigilant Guardian": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F33F}', description: 'Your system runs hot. Trapped survival energy has to leave the body, not be managed.', whyThisPath: 'High sympathetic activation discharges through somatic work, not through more thinking.', pathUrl: `${BASE_URL}/#services` },
  "The Quiet Retreater": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F33F}', description: 'Your system learned to withdraw. Reconnection starts below the neck.', whyThisPath: 'Dorsal shutdown conserves energy. Titrated contact widens the window again.', pathUrl: `${BASE_URL}/#services` },
  "The Sensitive Empath": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F33F}', description: 'Your window of tolerance is narrow. Widening it is the work.', whyThisPath: 'Sensitivity is not a flaw to correct. It is capacity that has not been built yet.', pathUrl: `${BASE_URL}/#services` },
  "The Disconnected Achiever": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F451}', description: 'You built the record and left the body behind. Reconnection is the next move.', whyThisPath: 'Achievement ran on override. Forty-five minutes puts the body back into the conversation.', pathUrl: `${BASE_URL}/#services` },
  "The Isolated Seeker": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{2728}', description: 'Connection reads as risk. The social engagement system is where this starts.', whyThisPath: 'Co-regulation is not a technique. It is how a nervous system learns safety.', pathUrl: `${BASE_URL}/#services` },
  "The Adaptive Survivor": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F33F}', description: 'You built complex adaptations. Stabilize first, simplify second.', whyThisPath: 'Complex patterns need graduated work at the foundation, not a faster pace.', pathUrl: `${BASE_URL}/#services` },
  "The Awakening Healer": { pathId: 'clarity-call', pathLabel: 'Recommended first step', pathTitle: 'The Clarity Call', pathEmoji: '\u{1F33F}', description: 'You know how deep the pattern runs. The foundation has to hold it.', whyThisPath: 'Deep work needs a regulated baseline underneath it.', pathUrl: `${BASE_URL}/#services` }
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
