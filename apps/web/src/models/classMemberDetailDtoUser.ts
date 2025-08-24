import type { ClassMemberDetailDtoUserRole } from './classMemberDetailDtoUserRole';

/**
 * 用户信息
 */
export type ClassMemberDetailDtoUser = {
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /** 用户姓名 */
  name: string;
  /**
   * 用户邮箱
   * @pattern ^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$
   */
  email: string;
  /** 用户角色 */
  role: ClassMemberDetailDtoUserRole;
};
