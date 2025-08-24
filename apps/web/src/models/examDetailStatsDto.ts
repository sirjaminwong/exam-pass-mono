import type { ExamDetailStatsDtoQuestionStatsItem } from './examDetailStatsDtoQuestionStatsItem';

export interface ExamDetailStatsDto {
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  attemptId: string;
  /** 题目总数 */
  totalQuestions: number;
  /** 已答题目数 */
  answeredQuestions: number;
  /** 正确答案数 */
  correctAnswers: number;
  /** 错误答案数 */
  wrongAnswers: number;
  /** 未答题目数 */
  unansweredQuestions: number;
  /** 正确率 */
  accuracy: number;
  /** 用时（分钟） */
  timeSpent?: number;
  /** 题目详细统计 */
  questionStats?: ExamDetailStatsDtoQuestionStatsItem[];
}
