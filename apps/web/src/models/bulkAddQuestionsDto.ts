
export interface BulkAddQuestionsDto {
  /**
   * 试卷ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  examId: string;
  /**
   * 题目ID列表
   * @minItems 1
   * @maxItems 100
   */
  questionIds: string[];
}
