
export interface AddWrongQuestionDto {
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId: string;
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
}
