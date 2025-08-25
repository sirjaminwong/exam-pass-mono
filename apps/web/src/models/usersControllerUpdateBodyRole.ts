
/**
 * 用户角色
 */
export type UsersControllerUpdateBodyRole = typeof UsersControllerUpdateBodyRole[keyof typeof UsersControllerUpdateBodyRole];


 
export const UsersControllerUpdateBodyRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
