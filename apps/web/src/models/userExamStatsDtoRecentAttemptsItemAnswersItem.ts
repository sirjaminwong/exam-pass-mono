import type { UserExamStatsDtoRecentAttemptsItemAnswersItemQuestion } from './userExamStatsDtoRecentAttemptsItemAnswersItemQuestion';

export type UserExamStatsDtoRecentAttemptsItemAnswersItem = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  /** @pattern ^[cC][^\s-]{8,}$ */
  questionId: string;
  userAnswer: unknown;
  isCorrect?: boolean;
  score?: number;
  question?: UserExamStatsDtoRecentAttemptsItemAnswersItemQuestion;
};
