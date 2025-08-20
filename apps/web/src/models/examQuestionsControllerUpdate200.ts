
export type ExamQuestionsControllerUpdate200 = {
  /** 关联记录ID */
  id?: string;
  /** 试卷ID */
  examId?: string;
  /** 题目ID */
  questionId?: string;
  /** 题目顺序 */
  order?: number;
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
};
