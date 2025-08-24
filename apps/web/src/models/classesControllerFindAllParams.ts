import type { ClassesControllerFindAllSortOrder } from './classesControllerFindAllSortOrder';

export type ClassesControllerFindAllParams = {
/**
 * 页码，默认为 1
 */
page?: string;
/**
 * 每页数量，默认为 10，最大 100
 */
limit?: string;
/**
 * 排序字段
 */
sortBy?: string;
/**
 * 排序方向，asc 或 desc
 */
sortOrder?: ClassesControllerFindAllSortOrder;
/**
 * 搜索关键词
 */
search?: string;
/**
 * 按教师ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
teacherId?: string;
/**
 * 是否有成员
 */
hasMembers?: string;
};
