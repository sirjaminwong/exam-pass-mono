import type { UpdateQuestionDtoType } from './updateQuestionDtoType';
import type { UpdateQuestionDtoOptions } from './updateQuestionDtoOptions';
import type { UpdateQuestionDtoCorrectAnswer } from './updateQuestionDtoCorrectAnswer';

export interface UpdateQuestionDto {
  /** 题目类型 */
  type?: UpdateQuestionDtoType;
  /**
   * 题目内容
   * @minLength 1
   * @maxLength 2000
   */
  content?: string;
  /** 选项列表（选择题使用，JSON格式） */
  options?: UpdateQuestionDtoOptions;
  /** 正确答案（JSON格式） */
  correctAnswer?: UpdateQuestionDtoCorrectAnswer;
  /**
   * 答案解析
   * @maxLength 1000
   */
  explanation?: string;
  /**
   * 题目分值
   * @minimum 0
   */
  score?: number;
}
