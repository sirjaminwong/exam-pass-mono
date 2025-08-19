import type { AnswersControllerBatchSubmitAnswersBodyAnswersItem } from './answersControllerBatchSubmitAnswersBodyAnswersItem';

export type AnswersControllerBatchSubmitAnswersBody = {
  /** 考试记录ID */
  attemptId: string;
  /** 答案列表 */
  answers: AnswersControllerBatchSubmitAnswersBodyAnswersItem[];
};
