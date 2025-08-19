import type { UsersControllerCreateBodyRole } from './usersControllerCreateBodyRole';

export type UsersControllerCreateBody = {
  /** 用户邮箱 */
  email: string;
  /** 用户姓名 */
  name: string;
  /** 用户密码 */
  password: string;
  /** 用户角色 */
  role?: UsersControllerCreateBodyRole;
};
