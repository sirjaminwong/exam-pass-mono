import type { UserExamStatsDtoRecentAttemptsItemUser } from './userExamStatsDtoRecentAttemptsItemUser';
import type { UserExamStatsDtoRecentAttemptsItemExam } from './userExamStatsDtoRecentAttemptsItemExam';
import type { UserExamStatsDtoRecentAttemptsItemAnswersItem } from './userExamStatsDtoRecentAttemptsItemAnswersItem';

export type UserExamStatsDtoRecentAttemptsItem = {
  /**
   * 考试记录ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  id: string;
  /**
   * 用户ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  userId: string;
  /**
   * 试卷ID
   * @pattern ^[cC][^\s-]{8,}$
   */
  examId: string;
  /**
   * 开始时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  startTime: string;
  /**
   * 结束时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  endTime?: string;
  /** 得分 */
  score?: number;
  /** 是否完成 */
  isCompleted: boolean;
  /**
   * 创建时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  createdAt: string;
  /**
   * 更新时间
   * @pattern ^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z))$
   */
  updatedAt: string;
  /** 用户信息 */
  user?: UserExamStatsDtoRecentAttemptsItemUser;
  /** 试卷信息 */
  exam?: UserExamStatsDtoRecentAttemptsItemExam;
  /** 答题记录 */
  answers?: UserExamStatsDtoRecentAttemptsItemAnswersItem[];
};
