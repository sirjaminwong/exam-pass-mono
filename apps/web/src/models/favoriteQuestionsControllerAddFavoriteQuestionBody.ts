
export type FavoriteQuestionsControllerAddFavoriteQuestionBody = {
  /** 用户ID */
  userId: string;
  /** 题目ID */
  questionId: string;
  /** 收藏备注（可选） */
  note?: string;
};
