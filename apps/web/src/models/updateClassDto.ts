
export interface UpdateClassDto {
  /**
   * 班级名称
   * @minLength 1
   */
  name?: string;
  /**
   * 班级代码
   * @minLength 1
   */
  code?: string;
  /**
   * 教师ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  teacherId?: string;
}
