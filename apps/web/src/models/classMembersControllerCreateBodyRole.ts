
/**
 * 角色
 */
export type ClassMembersControllerCreateBodyRole = typeof ClassMembersControllerCreateBodyRole[keyof typeof ClassMembersControllerCreateBodyRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ClassMembersControllerCreateBodyRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ASSISTANT: 'ASSISTANT',
} as const;
