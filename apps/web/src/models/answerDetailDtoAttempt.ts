
/**
 * 考试记录信息
 */
export type AnswerDetailDtoAttempt = {
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId: string;
  /**
   * 试卷ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  examId: string;
  /** 是否完成 */
  isCompleted: boolean;
};
