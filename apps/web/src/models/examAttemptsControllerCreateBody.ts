
export type ExamAttemptsControllerCreateBody = {
  /** 用户ID */
  userId: string;
  /** 试卷ID */
  examId: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 得分 */
  score?: number;
  /** 是否完成 */
  isCompleted?: boolean;
};
