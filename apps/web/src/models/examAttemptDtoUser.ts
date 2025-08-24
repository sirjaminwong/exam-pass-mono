
/**
 * 用户信息
 */
export type ExamAttemptDtoUser = {
  /** @pattern ^[cC][^\s-]{8,}$ */
  id: string;
  name: string;
  email: string;
};
