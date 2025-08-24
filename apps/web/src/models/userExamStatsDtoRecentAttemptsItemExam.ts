
/**
 * 试卷信息
 */
export type UserExamStatsDtoRecentAttemptsItemExam = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  title: string;
  description?: string;
};
