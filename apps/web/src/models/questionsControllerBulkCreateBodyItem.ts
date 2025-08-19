import type { QuestionsControllerBulkCreateBodyItemType } from './questionsControllerBulkCreateBodyItemType';

export type QuestionsControllerBulkCreateBodyItem = {
  /** 题目内容 */
  content: string;
  /** 题目类型 */
  type: QuestionsControllerBulkCreateBodyItemType;
  /** 选项列表（选择题使用） */
  options?: string[];
  /** 正确答案 */
  correctAnswer: string;
  /** 答案解析 */
  explanation?: string;
  /** 难度等级（1-5） */
  difficulty?: number;
  /** 标签列表 */
  tags?: string[];
};
