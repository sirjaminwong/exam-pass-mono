
export interface ExamResponseDto {
  /** 试卷ID */
  id: string;
  /** 试卷标题 */
  title: string;
  /** 试卷描述 */
  description?: string;
  /** 班级ID */
  classId?: string;
  /** 是否激活 */
  isActive: boolean;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
}
