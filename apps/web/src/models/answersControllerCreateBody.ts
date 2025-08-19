
export type AnswersControllerCreateBody = {
  /** 考试记录ID */
  attemptId: string;
  /** 题目ID */
  questionId: string;
  /** 用户答案 */
  userAnswer: unknown;
  /** 是否正确 */
  isCorrect?: boolean;
  /** 得分 */
  score?: number;
};
