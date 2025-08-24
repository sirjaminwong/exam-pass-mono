import type { QuestionsControllerFindAllType } from './questionsControllerFindAllType';

export type QuestionsControllerFindAllParams = {
/**
 * 按题目类型筛选
 */
type?: QuestionsControllerFindAllType;
/**
 * 按题目内容搜索
 */
content?: string;
/**
 * 最小分值
 */
minScore?: string;
/**
 * 最大分值
 */
maxScore?: string;
/**
 * 搜索关键词（题目内容）
 */
search?: string;
/**
 * 页码
 */
page?: string;
/**
 * 每页数量
 */
limit?: string;
};
