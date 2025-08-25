
/**
 * 用户角色
 */
export type UserProfileDtoRole = typeof UserProfileDtoRole[keyof typeof UserProfileDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UserProfileDtoRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
