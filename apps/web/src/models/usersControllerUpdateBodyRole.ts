
/**
 * 用户角色
 */
export type UsersControllerUpdateBodyRole = typeof UsersControllerUpdateBodyRole[keyof typeof UsersControllerUpdateBodyRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UsersControllerUpdateBodyRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
