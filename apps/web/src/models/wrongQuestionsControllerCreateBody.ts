
export type WrongQuestionsControllerCreateBody = {
  /** 用户ID */
  userId: string;
  /** 题目ID */
  questionId: string;
  /** 是否已解决 */
  isResolved?: boolean;
};
