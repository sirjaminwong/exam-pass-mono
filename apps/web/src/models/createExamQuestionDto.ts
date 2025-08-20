
export interface CreateExamQuestionDto {
  /** Exam ID */
  examId: string;
  /** Question ID */
  questionId: string;
  /** 题目在试卷中的顺序 */
  order: number;
}
