
export type QuestionsControllerFindAllType = typeof QuestionsControllerFindAllType[keyof typeof QuestionsControllerFindAllType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const QuestionsControllerFindAllType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TRUE_FALSE: 'TRUE_FALSE',
  INDEFINITE_CHOICE: 'INDEFINITE_CHOICE',
} as const;
