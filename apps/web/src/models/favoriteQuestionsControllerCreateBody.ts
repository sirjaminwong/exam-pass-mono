
export type FavoriteQuestionsControllerCreateBody = {
  /** 用户ID */
  userId: string;
  /** 题目ID */
  questionId: string;
  /** 收藏备注 */
  note?: string;
};
