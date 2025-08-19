import type { CreateQuestionsDtoQuestionsItemType } from './createQuestionsDtoQuestionsItemType';
import type { CreateQuestionsDtoQuestionsItemOptions } from './createQuestionsDtoQuestionsItemOptions';
import type { CreateQuestionsDtoQuestionsItemCorrectAnswer } from './createQuestionsDtoQuestionsItemCorrectAnswer';

export type CreateQuestionsDtoQuestionsItem = {
  /** 题目类型 */
  type: CreateQuestionsDtoQuestionsItemType;
  /**
   * 题目内容
   * @minLength 1
   * @maxLength 2000
   */
  content: string;
  /** 选项列表（选择题使用，JSON格式） */
  options?: CreateQuestionsDtoQuestionsItemOptions;
  /** 正确答案（JSON格式） */
  correctAnswer: CreateQuestionsDtoQuestionsItemCorrectAnswer;
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
};
