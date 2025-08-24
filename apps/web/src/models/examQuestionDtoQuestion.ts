import type { ExamQuestionDtoQuestionType } from './examQuestionDtoQuestionType';
import type { ExamQuestionDtoQuestionOptions } from './examQuestionDtoQuestionOptions';
import type { ExamQuestionDtoQuestionCorrectAnswer } from './examQuestionDtoQuestionCorrectAnswer';

/**
 * 关联的题目信息
 */
export type ExamQuestionDtoQuestion = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  type: ExamQuestionDtoQuestionType;
  content: string;
  options?: ExamQuestionDtoQuestionOptions;
  correctAnswer: ExamQuestionDtoQuestionCorrectAnswer;
  explanation?: string;
  score: number;
  /** @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$ */
  createdAt: string;
  /** @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$ */
  updatedAt: string;
};
