
/**
 * 用户角色
 */
export type ClassMemberDetailDtoUserRole = typeof ClassMemberDetailDtoUserRole[keyof typeof ClassMemberDetailDtoUserRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ClassMemberDetailDtoUserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
