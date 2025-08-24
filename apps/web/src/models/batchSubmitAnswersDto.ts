import type { BatchSubmitAnswersDtoAnswersItem } from './batchSubmitAnswersDtoAnswersItem';

export interface BatchSubmitAnswersDto {
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  attemptId: string;
  /**
   * 答案列表
   * @minItems 1
   */
  answers: BatchSubmitAnswersDtoAnswersItem[];
}
