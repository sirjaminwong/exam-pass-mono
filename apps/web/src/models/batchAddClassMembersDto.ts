
export interface BatchAddClassMembersDto {
  /**
   * 用户ID列表
   * @minItems 1
   */
  userIds: string[];
  /**
   * 班级ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  classId: string;
}
