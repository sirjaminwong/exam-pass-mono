
export interface CreateExamQuestionDto {
  /**
   * 试卷ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  examId: string;
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /**
   * 题目在试卷中的顺序
   * @minimum 1
   */
  order: number;
}
