
export type AnswersControllerUpdateBody = {
  /** 用户答案 */
  userAnswer?: unknown;
  /** 是否正确 */
  isCorrect?: boolean;
  /** 得分 */
  score?: number;
};
