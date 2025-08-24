import type { SubmitAnswerDtoUserAnswer } from './submitAnswerDtoUserAnswer';

export interface SubmitAnswerDto {
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  attemptId: string;
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /** 用户答案 */
  userAnswer: SubmitAnswerDtoUserAnswer;
}
