
/**
 * 题目类型
 */
export type CreateQuestionsDtoQuestionsItemType = typeof CreateQuestionsDtoQuestionsItemType[keyof typeof CreateQuestionsDtoQuestionsItemType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateQuestionsDtoQuestionsItemType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
