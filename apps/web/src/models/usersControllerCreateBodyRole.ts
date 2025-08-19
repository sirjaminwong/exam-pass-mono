
/**
 * 用户角色
 */
export type UsersControllerCreateBodyRole = typeof UsersControllerCreateBodyRole[keyof typeof UsersControllerCreateBodyRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UsersControllerCreateBodyRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
