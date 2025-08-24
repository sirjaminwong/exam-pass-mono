import type { BatchSubmitAnswersDtoAnswersItemUserAnswer } from './batchSubmitAnswersDtoAnswersItemUserAnswer';

export type BatchSubmitAnswersDtoAnswersItem = {
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /** 用户答案 */
  userAnswer: BatchSubmitAnswersDtoAnswersItemUserAnswer;
};
