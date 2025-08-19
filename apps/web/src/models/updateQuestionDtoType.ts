
/**
 * 题目类型
 */
export type UpdateQuestionDtoType = typeof UpdateQuestionDtoType[keyof typeof UpdateQuestionDtoType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateQuestionDtoType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
