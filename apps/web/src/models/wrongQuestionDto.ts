import type { WrongQuestionDtoResolvedAt } from './wrongQuestionDtoResolvedAt';

export interface WrongQuestionDto {
  /**
   * 错题记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId: string;
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /**
   * 添加时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  addedAt: string;
  /** 是否已解决 */
  isResolved: boolean;
  /** 解决时间 */
  resolvedAt: WrongQuestionDtoResolvedAt;
}
