
/**
 * 题目类型
 */
export type QuestionResponseDtoType = typeof QuestionResponseDtoType[keyof typeof QuestionResponseDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QuestionResponseDtoType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
