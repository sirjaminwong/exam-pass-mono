
/**
 * 题目类型
 */
export type CreateQuestionDtoType = typeof CreateQuestionDtoType[keyof typeof CreateQuestionDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateQuestionDtoType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
