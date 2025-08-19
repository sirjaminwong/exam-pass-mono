
export interface UpdateExamDto {
  /**
   * 试卷标题
   * @minLength 1
   * @maxLength 200
   */
  title?: string;
  /**
   * 试卷描述
   * @maxLength 1000
   */
  description?: string;
  /**
   * 所属班级ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  classId?: string;
  /** 是否启用 */
  isActive?: boolean;
}
