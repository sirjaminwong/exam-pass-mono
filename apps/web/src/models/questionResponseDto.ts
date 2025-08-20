import type { QuestionResponseDtoType } from './questionResponseDtoType';
import type { QuestionResponseDtoOptions } from './questionResponseDtoOptions';
import type { QuestionResponseDtoCorrectAnswer } from './questionResponseDtoCorrectAnswer';

export interface QuestionResponseDto {
  /** 题目ID */
  id: string;
  /** 题目类型 */
  type: QuestionResponseDtoType;
  /** 题目内容 */
  content: string;
  /** 选项（JSON格式） */
  options?: QuestionResponseDtoOptions;
  /** 正确答案（JSON格式） */
  correctAnswer: QuestionResponseDtoCorrectAnswer;
  /** 解析 */
  explanation?: string;
  /** 分值 */
  score: number;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}
