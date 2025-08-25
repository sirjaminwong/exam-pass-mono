
/**
 * 用户角色
 */
export type UsersControllerCreateBodyRole = typeof UsersControllerCreateBodyRole[keyof typeof UsersControllerCreateBodyRole];


 
export const UsersControllerCreateBodyRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
