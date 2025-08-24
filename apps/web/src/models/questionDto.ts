import type { QuestionDtoType } from './questionDtoType';
import type { QuestionDtoExplanation } from './questionDtoExplanation';

export interface QuestionDto {
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /** 题目类型 */
  type: QuestionDtoType;
  /** 题目内容 */
  content: string;
  /** 选项列表（JSON格式） */
  options?: unknown;
  /** 正确答案（JSON格式） */
  correctAnswer: unknown;
  /** 答案解析 */
  explanation: QuestionDtoExplanation;
  /** 题目分值 */
  score: number;
  /**
   * 创建时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string;
  /**
   * 更新时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  updatedAt: string;
}
