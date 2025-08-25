
/**
 * 用户角色
 */
export type LoginResponseDtoUserRole = typeof LoginResponseDtoUserRole[keyof typeof LoginResponseDtoUserRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const LoginResponseDtoUserRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
