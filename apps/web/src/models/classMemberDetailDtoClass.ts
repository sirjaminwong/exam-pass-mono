
/**
 * 班级信息
 */
export type ClassMemberDetailDtoClass = {
  /**
   * 班级ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /** 班级名称 */
  name: string;
  /** 班级代码 */
  code: string;
};
