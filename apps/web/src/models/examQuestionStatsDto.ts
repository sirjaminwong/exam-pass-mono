import type { ExamQuestionStatsDtoQuestionsByType } from './examQuestionStatsDtoQuestionsByType';

export interface ExamQuestionStatsDto {
  /**
   * 试卷ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  examId: string;
  /** 题目总数 */
  totalQuestions: number;
  /** 按类型分组的题目数量 */
  questionsByType: ExamQuestionStatsDtoQuestionsByType;
  /** 试卷总分 */
  totalScore: number;
  /** 平均分值 */
  averageScore: number;
}
