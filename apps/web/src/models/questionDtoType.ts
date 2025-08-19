
/**
 * 题目类型
 */
export type QuestionDtoType = typeof QuestionDtoType[keyof typeof QuestionDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QuestionDtoType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
