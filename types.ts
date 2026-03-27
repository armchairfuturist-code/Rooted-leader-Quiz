export interface Question {
  id: number;
  section: string;
  text: string;
  category: string;
  reverse_score?: boolean;
}
export interface QuizProgress {
  currentQuestionIndex: number;
  answers: number[];
  timestamp: number;
}
export interface CategoryScores {
    interoception: number;
    dorsal_vagal: number;
    sympathetic: number;
    window_tolerance: number;
    social_engagement: number;
    fawn_response: number;
    self_compassion: number;
    ventral_vagal_deficit: number;
}
export interface PathRecommendation {
  pathId: string;
  pathLabel: string;
  pathTitle: string;
  pathEmoji: string;
  description: string;
  whyThisPath: string;
  pathUrl: string;
}
export interface QuizResults {
  totalScore: number;
  categoryScores: CategoryScores;
  dominantPattern: string;
  patternDescription: string;
  patternIcon: string;
  recommendedPath: PathRecommendation;
}
