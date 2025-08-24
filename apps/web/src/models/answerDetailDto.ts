import type { AnswerDetailDtoUserAnswer } from './answerDetailDtoUserAnswer';
import type { AnswerDetailDtoAttempt } from './answerDetailDtoAttempt';
import type { AnswerDetailDtoQuestion } from './answerDetailDtoQuestion';

export interface AnswerDetailDto {
  /**
   * 答题记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  attemptId: string;
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  questionId: string;
  /** 用户答案 */
  userAnswer: AnswerDetailDtoUserAnswer;
  /** 是否正确 */
  isCorrect: boolean;
  /**
   * 得分
   * @minimum 0
   */
  score: number;
  /**
   * 答题时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  answeredAt: string;
  /** 考试记录信息 */
  attempt?: AnswerDetailDtoAttempt;
  /** 题目信息 */
  question?: AnswerDetailDtoQuestion;
}
