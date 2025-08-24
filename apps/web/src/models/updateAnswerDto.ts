import type { UpdateAnswerDtoUserAnswer } from './updateAnswerDtoUserAnswer';

export interface UpdateAnswerDto {
  /** 用户答案 */
  userAnswer?: UpdateAnswerDtoUserAnswer;
  /** 是否正确 */
  isCorrect?: boolean;
  /**
   * 得分
   * @minimum 0
   */
  score?: number;
}
