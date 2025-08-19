
/**
 * 用户角色
 */
export type UpdateUserDtoRole = typeof UpdateUserDtoRole[keyof typeof UpdateUserDtoRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UpdateUserDtoRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
