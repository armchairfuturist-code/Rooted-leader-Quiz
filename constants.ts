
import type { Question } from './types';

export const questions: Question[] = [
  {
    id: 1,
    section: "Interoceptive Awareness",
    text: "Can you sense subtle shifts in your body (tension building, energy changing, temperature fluctuating) before emotions become overwhelming?",
    category: "interoception"
  },
  {
    id: 2,
    section: "Interoceptive Awareness",
    text: "Do you notice yourself 'living in your head' – analyzing, planning, worrying – while feeling disconnected from physical sensations in your body?",
    category: "interoception"
  },
  {
    id: 3,
    section: "Interoceptive Awareness",
    text: "When stressed, do physical symptoms appear (headaches, digestive issues, jaw clenching, muscle tension) that seem unrelated to medical causes?",
    category: "interoception"
  },
  {
    id: 4,
    section: "Window of Tolerance",
    text: "In uncertain or stressful situations, do you feel numb, spacey, or like you're watching yourself from outside your body?",
    category: "dorsal_vagal"
  },
  {
    id: 5,
    section: "Window of Tolerance",
    text: "Do you experience hypervigilance – constantly scanning for threats, unable to fully relax, or feeling 'wired but tired'?",
    category: "sympathetic"
  },
  {
    id: 6,
    section: "Window of Tolerance",
    text: "Does your heart race, do thoughts spiral, or do you feel energized-yet-anxious even when you want to calm down?",
    category: "sympathetic"
  },
  {
    id: 7,
    section: "Window of Tolerance",
    text: "Do your emotions shift rapidly (calm to anxious, peaceful to irritable, content to sad) without clear external triggers?",
    category: "window_tolerance"
  },
  {
    id: 8,
    section: "Window of Tolerance",
    text: "Can you 'ride the waves' of difficult emotions without becoming completely overwhelmed or shutting down entirely?",
    category: "window_tolerance",
    reverse_score: true
  },
  {
    id: 9,
    section: "Social Engagement & Safety",
    text: "Do you find it hard to feel truly safe or settled, even in situations that others find comfortable or enjoyable?",
    category: "social_engagement"
  },
  {
    id: 10,
    section: "Social Engagement & Safety",
    text: "Is it difficult to trust others, accept support, or reach out for help when you genuinely need it?",
    category: "social_engagement"
  },
  {
    id: 11,
    section: "Social Engagement & Safety",
    text: "In social situations, do you feel like you're performing or masking your true self rather than being authentic?",
    category: "social_engagement"
  },
  {
    id: 12,
    section: "Social Engagement & Safety",
    text: "Do you notice yourself withdrawing from connections or activities that once brought you joy?",
    category: "social_engagement"
  },
  {
    id: 13,
    section: "Stress Response Patterns",
    text: "Under pressure or conflict, do you tend to freeze/withdraw, go silent, or feel paralyzed in decision-making?",
    category: "dorsal_vagal"
  },
  {
    id: 14,
    section: "Stress Response Patterns",
    text: "Do you find yourself people-pleasing, over-accommodating, or saying 'yes' when you mean 'no'?",
    category: "fawn_response"
  },
  {
    id: 15,
    section: "Stress Response Patterns",
    text: "When triggered, do you react impulsively – through anger, flight, defensive words, or abrupt exits – before you can think clearly?",
    category: "sympathetic"
  },
  {
    id: 16,
    section: "Agency & Purpose",
    text: "Do you feel 'stuck' or unable to move forward, even with goals or changes you genuinely desire?",
    category: "dorsal_vagal"
  },
  {
    id: 17,
    section: "Agency & Purpose",
    text: "Is it hard to access a sense of meaning, purpose, or direction in your life?",
    category: "ventral_vagal_deficit"
  },
  {
    id: 18,
    section: "Agency & Purpose",
    text: "Do you struggle to imagine a future where you feel peaceful, fulfilled, and authentically yourself?",
    category: "window_tolerance"
  },
  {
    id: 19,
    section: "Self-Relationship",
    text: "When you make mistakes or face challenges, is your inner voice harsh, critical, or judgmental?",
    category: "self_compassion"
  },
  {
    id: 20,
    section: "Self-Relationship",
    text: "Do you find it difficult to offer yourself the same kindness and understanding you'd give a close friend?",
    category: "self_compassion"
  },
  {
    id: 21,
    section: "Self-Relationship",
    text: "Can you acknowledge your pain without becoming consumed by it, or do you tend to minimize/dismiss your struggles?",
    category: "self_compassion"
  },
  {
    id: 22,
    section: "Capacity for Joy",
    text: "Can you access moments of genuine peace, joy, or deep connection with others – or does dysregulation consistently block these experiences?",
    category: "ventral_vagal_deficit",
    reverse_score: true
  }
];

export const answerOptions = ["Never", "Rarely", "Sometimes", "Often", "Always"];

export const microAffirmations = [
  "You're listening to your body...", // Q1-3
  "Deepening awareness...", // Q4-7
  "Honoring your truth...", // Q8-11
  "Connecting to your wisdom...", // Q12-15
  "Recognizing your patterns...", // Q16-19
  "Almost there... breathing together...", // Q20-22
];

export const getMicroAffirmation = (questionIndex: number) => {
  if (questionIndex < 3) return microAffirmations[0];
  if (questionIndex < 7) return microAffirmations[1];
  if (questionIndex < 11) return microAffirmations[2];
  if (questionIndex < 15) return microAffirmations[3];
  if (questionIndex < 19) return microAffirmations[4];
  return microAffirmations[5];
};
