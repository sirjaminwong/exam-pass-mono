
export type UsersControllerFindAllRole = typeof UsersControllerFindAllRole[keyof typeof UsersControllerFindAllRole];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UsersControllerFindAllRole = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;
