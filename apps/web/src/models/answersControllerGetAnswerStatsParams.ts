
export type AnswersControllerGetAnswerStatsParams = {
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
 * 用户ID
 * @pattern ^[cC][^\s-]{8,}$
 */
userId?: string;
};
