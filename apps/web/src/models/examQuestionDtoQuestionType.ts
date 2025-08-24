
export type ExamQuestionDtoQuestionType = typeof ExamQuestionDtoQuestionType[keyof typeof ExamQuestionDtoQuestionType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ExamQuestionDtoQuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
