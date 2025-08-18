
export type ExamAttemptsControllerFindAllParams = {
/**
 * 用户ID
 */
userId?: string;
/**
 * 试卷ID
 */
examId?: string;
/**
 * 是否完成
 */
isCompleted?: boolean;
/**
 * 跳过数量
 */
skip?: number;
/**
 * 获取数量
 */
take?: number;
};
