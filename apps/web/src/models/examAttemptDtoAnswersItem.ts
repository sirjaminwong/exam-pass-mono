import type { ExamAttemptDtoAnswersItemQuestion } from './examAttemptDtoAnswersItemQuestion';

export type ExamAttemptDtoAnswersItem = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  /** @pattern ^[cC][^\s-]{8,}$ */
  questionId: string;
  userAnswer: unknown;
  isCorrect?: boolean;
  score?: number;
  question?: ExamAttemptDtoAnswersItemQuestion;
};
