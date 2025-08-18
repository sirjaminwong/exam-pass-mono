import type { QuestionsControllerFindAllType } from './questionsControllerFindAllType';

export type QuestionsControllerFindAllParams = {
/**
 * 题目类型
 */
type?: QuestionsControllerFindAllType;
/**
 * 跳过数量
 */
skip?: number;
/**
 * 获取数量
 */
take?: number;
};
