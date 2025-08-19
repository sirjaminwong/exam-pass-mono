
/**
 * 题目类型
 */
export type QuestionsControllerCreateBodyType = typeof QuestionsControllerCreateBodyType[keyof typeof QuestionsControllerCreateBodyType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QuestionsControllerCreateBodyType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  FILL_BLANK: 'FILL_BLANK',
  ESSAY: 'ESSAY',
} as const;
