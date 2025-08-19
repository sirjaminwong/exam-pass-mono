import type { CreateQuestionDtoType } from './createQuestionDtoType';
import type { CreateQuestionDtoOptions } from './createQuestionDtoOptions';
import type { CreateQuestionDtoCorrectAnswer } from './createQuestionDtoCorrectAnswer';

export interface CreateQuestionDto {
  /** 题目类型 */
  type: CreateQuestionDtoType;
  /**
   * 题目内容
   * @minLength 1
   * @maxLength 2000
   */
  content: string;
  /** 选项列表（选择题使用，JSON格式） */
  options?: CreateQuestionDtoOptions;
  /** 正确答案（JSON格式） */
  correctAnswer: CreateQuestionDtoCorrectAnswer;
  /**
   * 答案解析
   * @maxLength 1000
   */
  explanation?: string;
  /**
   * 题目分值
   * @minimum 0
   */
  score: number;
}
