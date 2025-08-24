
/**
 * 试卷信息
 */
export type ExamAttemptDtoExam = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  title: string;
  description?: string;
};
