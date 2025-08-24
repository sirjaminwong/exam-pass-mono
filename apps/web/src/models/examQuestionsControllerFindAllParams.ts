import type { ExamQuestionsControllerFindAllSortOrder } from './examQuestionsControllerFindAllSortOrder';

export type ExamQuestionsControllerFindAllParams = {
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
sortOrder?: ExamQuestionsControllerFindAllSortOrder;
/**
 * 搜索关键词
 */
search?: string;
/**
 * 按试卷ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
examId?: string;
/**
 * 按题目ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
questionId?: string;
/**
 * 题目顺序范围起始
 */
orderFrom?: string;
/**
 * 题目顺序范围结束
 */
orderTo?: string;
};
