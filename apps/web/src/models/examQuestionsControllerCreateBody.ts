
export type ExamQuestionsControllerCreateBody = {
  /** 试卷ID */
  examId: string;
  /** 题目ID */
  questionId: string;
  /** 题目在试卷中的顺序 */
  order?: number;
  /** 题目分值 */
  score?: number;
};
