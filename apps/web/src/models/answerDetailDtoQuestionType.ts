
/**
 * 题目类型
 */
export type AnswerDetailDtoQuestionType = typeof AnswerDetailDtoQuestionType[keyof typeof AnswerDetailDtoQuestionType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AnswerDetailDtoQuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
