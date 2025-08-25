
export interface ChangePasswordDto {
  /** 原密码 */
  oldPassword: string;
  /**
   * 新密码
   * @minLength 6
   */
  newPassword: string;
}
