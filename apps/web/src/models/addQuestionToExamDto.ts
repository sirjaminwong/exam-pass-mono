
export interface AddQuestionToExamDto {
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /**
   * 题目顺序
   * @minimum 1
   */
  order: number;
}
