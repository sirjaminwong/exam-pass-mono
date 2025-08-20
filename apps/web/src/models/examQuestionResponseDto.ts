import type { ExamResponseDto } from './examResponseDto';
import type { QuestionResponseDto } from './questionResponseDto';

export interface ExamQuestionResponseDto {
  /** 试卷题目关联记录ID */
  id: string;
  /** 试卷ID */
  examId: string;
  /** 题目ID */
  questionId: string;
  /** 题目在试卷中的顺序 */
  order: number;
  /** 关联的试卷信息 */
  exam?: ExamResponseDto;
  /** 关联的题目信息 */
  question?: QuestionResponseDto;
}
