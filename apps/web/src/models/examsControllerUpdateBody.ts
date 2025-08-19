
export type ExamsControllerUpdateBody = {
  /** 试卷标题 */
  title?: string;
  /** 试卷描述 */
  description?: string;
  /** 考试时长（分钟） */
  duration?: number;
  /** 总分 */
  totalScore?: number;
  /** 是否激活 */
  isActive?: boolean;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
};
