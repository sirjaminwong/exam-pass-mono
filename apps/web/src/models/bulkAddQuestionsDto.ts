
export interface BulkAddQuestionsDto {
  /** 试卷ID */
  examId: string;
  /** 题目ID列表 */
  questionIds: string[];
}
