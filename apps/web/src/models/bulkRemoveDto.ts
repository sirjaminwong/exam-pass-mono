
export interface BulkRemoveDto {
  /**
   * 试卷题目关联记录ID列表
   * @minItems 1
   * @maxItems 100
   */
  ids: string[];
}
