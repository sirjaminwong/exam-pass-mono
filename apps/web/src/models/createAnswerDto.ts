import type { CreateAnswerDtoUserAnswer } from './createAnswerDtoUserAnswer';

export interface CreateAnswerDto {
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
  userAnswer: CreateAnswerDtoUserAnswer;
  /** 是否正确 */
  isCorrect?: boolean;
  /**
   * 得分
   * @minimum 0
   */
  score?: number;
}
