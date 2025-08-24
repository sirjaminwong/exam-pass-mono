
export interface AnswerStatsDto {
  /** 总答题数 */
  totalAnswers: number;
  /** 正确答题数 */
  correctAnswers: number;
  /** 错误答题数 */
  incorrectAnswers: number;
  /**
   * 正确率
   * @minimum 0
   * @maximum 1
   */
  accuracy: number;
  /**
   * 总得分
   * @minimum 0
   */
  totalScore: number;
  /**
   * 总分值
   * @minimum 0
   */
  maxScore: number;
  /**
   * 得分率
   * @minimum 0
   * @maximum 1
   */
  scoreRate: number;
}
