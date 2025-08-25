
/**
 * 用户角色
 */
export type RegisterDtoRole = typeof RegisterDtoRole[keyof typeof RegisterDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RegisterDtoRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
