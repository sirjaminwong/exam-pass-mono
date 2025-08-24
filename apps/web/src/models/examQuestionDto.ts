import type { ExamQuestionDtoExam } from './examQuestionDtoExam';
import type { ExamQuestionDtoQuestion } from './examQuestionDtoQuestion';

export interface ExamQuestionDto {
  /**
   * 试卷题目关联记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
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
  /** 题目在试卷中的顺序 */
  order: number;
  /** 关联的试卷信息 */
  exam?: ExamQuestionDtoExam;
  /** 关联的题目信息 */
  question?: ExamQuestionDtoQuestion;
}
