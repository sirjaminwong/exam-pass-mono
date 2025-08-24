
export interface FavoriteQuestionsByTypeItemDto {
  /** 题目类型 */
  questionType: string;
  /**
   * 该类型收藏数量
   * @minimum 0
   */
  count: number;
  /**
   * 占总收藏的百分比
   * @minimum 0
   * @maximum 100
   */
  percentage: number;
}
