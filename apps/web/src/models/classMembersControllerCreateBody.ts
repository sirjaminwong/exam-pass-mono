import type { ClassMembersControllerCreateBodyRole } from './classMembersControllerCreateBodyRole';

export type ClassMembersControllerCreateBody = {
  /** 用户ID */
  userId: string;
  /** 班级ID */
  classId: string;
  /** 角色 */
  role?: ClassMembersControllerCreateBodyRole;
};
