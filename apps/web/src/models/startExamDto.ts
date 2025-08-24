
export interface StartExamDto {
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
}
