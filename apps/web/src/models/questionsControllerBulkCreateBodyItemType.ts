
/**
 * 题目类型
 */
export type QuestionsControllerBulkCreateBodyItemType = typeof QuestionsControllerBulkCreateBodyItemType[keyof typeof QuestionsControllerBulkCreateBodyItemType];


 
export const QuestionsControllerBulkCreateBodyItemType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  FILL_BLANK: 'FILL_BLANK',
  ESSAY: 'ESSAY',
} as const;
