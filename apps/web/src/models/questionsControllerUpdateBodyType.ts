
/**
 * 题目类型
 */
export type QuestionsControllerUpdateBodyType = typeof QuestionsControllerUpdateBodyType[keyof typeof QuestionsControllerUpdateBodyType];


 
export const QuestionsControllerUpdateBodyType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  FILL_BLANK: 'FILL_BLANK',
  ESSAY: 'ESSAY',
} as const;
