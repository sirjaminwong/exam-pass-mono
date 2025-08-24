import type { UserExamStatsDtoRecentAttemptsItem } from './userExamStatsDtoRecentAttemptsItem';

export interface UserExamStatsDto {
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId: string;
  /** 参与考试总数 */
  totalExams: number;
  /** 完成考试数 */
  completedExams: number;
  /** 平均分数 */
  averageScore?: number;
  /** 最佳分数 */
  bestScore?: number;
  /** 总学习时间（分钟） */
  totalStudyTime?: number;
  /** 最近考试记录 */
  recentAttempts?: UserExamStatsDtoRecentAttemptsItem[];
}
