
/**
 * 用户角色
 */
export type CreateUserDtoRole = typeof CreateUserDtoRole[keyof typeof CreateUserDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateUserDtoRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
