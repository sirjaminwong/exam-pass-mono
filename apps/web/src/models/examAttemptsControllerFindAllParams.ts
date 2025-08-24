import type { ExamAttemptsControllerFindAllSortOrder } from './examAttemptsControllerFindAllSortOrder';

export type ExamAttemptsControllerFindAllParams = {
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
sortOrder?: ExamAttemptsControllerFindAllSortOrder;
/**
 * 搜索关键词
 */
search?: string;
/**
 * 按用户ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
userId?: string;
/**
 * 按试卷ID筛选
 * @pattern ^[cC][^\s-]{8,}$
 */
examId?: string;
/**
 * 按完成状态筛选
 */
isCompleted?: string;
/**
 * 开始时间范围-起始
 * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
 */
startTimeFrom?: string;
/**
 * 开始时间范围-结束
 * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
 */
startTimeTo?: string;
/**
 * 最小分数
 */
minScore?: string;
/**
 * 最大分数
 */
maxScore?: string;
};
