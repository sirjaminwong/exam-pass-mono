
/**
 * 题目类型
 */
export type QuestionsControllerUpdateBodyType = typeof QuestionsControllerUpdateBodyType[keyof typeof QuestionsControllerUpdateBodyType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QuestionsControllerUpdateBodyType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  FILL_BLANK: 'FILL_BLANK',
  ESSAY: 'ESSAY',
} as const;
