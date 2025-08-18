
export type AnswersControllerFindAllParams = {
/**
 * 考试记录ID
 */
attemptId?: string;
/**
 * 题目ID
 */
questionId?: string;
/**
 * 是否正确
 */
isCorrect?: boolean;
/**
 * 跳过数量
 */
skip?: number;
/**
 * 获取数量
 */
take?: number;
};
