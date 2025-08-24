import type { AnswersControllerFindAllSortOrder } from './answersControllerFindAllSortOrder';

export type AnswersControllerFindAllParams = {
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
sortOrder?: AnswersControllerFindAllSortOrder;
/**
 * 搜索关键词
 */
search?: string;
/**
 * 考试记录ID
 * @pattern ^[cC][^\s-]{8,}$
 */
attemptId?: string;
/**
 * 题目ID
 * @pattern ^[cC][^\s-]{8,}$
 */
questionId?: string;
/**
 * 是否正确
 */
isCorrect?: string;
};
