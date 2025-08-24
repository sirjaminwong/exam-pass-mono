
/**
 * 用户角色
 */
export type ClassDetailDtoMembersItemUserRole = typeof ClassDetailDtoMembersItemUserRole[keyof typeof ClassDetailDtoMembersItemUserRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ClassDetailDtoMembersItemUserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
