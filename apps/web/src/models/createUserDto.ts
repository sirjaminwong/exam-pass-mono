import type { CreateUserDtoRole } from './createUserDtoRole';

export interface CreateUserDto {
  /**
   * 用户邮箱
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /**
   * 用户姓名
   * @minLength 1
   * @maxLength 50
   */
  name: string;
  /**
   * 用户密码
   * @minLength 6
   */
  password: string;
  /** 用户角色 */
  role?: CreateUserDtoRole;
}
