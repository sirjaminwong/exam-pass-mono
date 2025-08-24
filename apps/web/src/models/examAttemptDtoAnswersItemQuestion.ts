
export type ExamAttemptDtoAnswersItemQuestion = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  type: string;
  content: string;
  score: number;
};
