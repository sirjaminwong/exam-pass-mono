
/**
 * 用户角色
 */
export type UserDtoRole = typeof UserDtoRole[keyof typeof UserDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserDtoRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
