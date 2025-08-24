
export interface ExamStatsDto {
  /** 试卷总数 */
  totalExams: number;
  /** 启用的试卷数 */
  activeExams: number;
  /** 总考试次数 */
  totalAttempts: number;
  /** 平均分 */
  averageScore: number;
  /**
   * 通过率
   * @minimum 0
   * @maximum 1
   */
  passRate: number;
}
