import type { CreateQuestionsDtoQuestionsItem } from './createQuestionsDtoQuestionsItem';

export interface CreateQuestionsDto {
  /**
   * 题目列表
   * @minItems 1
   * @maxItems 100
   */
  questions: CreateQuestionsDtoQuestionsItem[];
}
