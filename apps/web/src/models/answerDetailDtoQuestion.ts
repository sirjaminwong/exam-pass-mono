import type { AnswerDetailDtoQuestionType } from './answerDetailDtoQuestionType';
import type { AnswerDetailDtoQuestionCorrectAnswer } from './answerDetailDtoQuestionCorrectAnswer';

/**
 * 题目信息
 */
export type AnswerDetailDtoQuestion = {
  /**
   * 题目ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /** 题目类型 */
  type: AnswerDetailDtoQuestionType;
  /** 题目内容 */
  content: string;
  /** 正确答案 */
  correctAnswer: AnswerDetailDtoQuestionCorrectAnswer;
  /**
   * 题目分值
   * @minimum 0
   */
  score: number;
};
