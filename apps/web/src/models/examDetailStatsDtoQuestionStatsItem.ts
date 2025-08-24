
export type ExamDetailStatsDtoQuestionStatsItem = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  questionId: string;
  questionType: string;
  isCorrect?: boolean;
  userAnswer?: unknown;
  correctAnswer: unknown;
  score: number;
  earnedScore?: number;
};
