
export interface UpdateClassMemberDto {
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId?: string;
  /**
   * 班级ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  classId?: string;
}
