
export type AnswersControllerSubmitAnswerBody = {
  /** 考试记录ID */
  attemptId: string;
  /** 题目ID */
  questionId: string;
  /** 用户答案 */
  userAnswer: unknown;
};
