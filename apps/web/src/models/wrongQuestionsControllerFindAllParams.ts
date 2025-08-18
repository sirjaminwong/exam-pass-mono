
export type WrongQuestionsControllerFindAllParams = {
/**
 * 用户ID
 */
userId?: string;
/**
 * 题目ID
 */
questionId?: string;
/**
 * 是否已解决
 */
isResolved?: boolean;
/**
 * 跳过数量
 */
skip?: number;
/**
 * 获取数量
 */
take?: number;
};
