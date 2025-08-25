
export interface TokenResponseDto {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 访问令牌过期时间（秒） */
  expiresIn: number;
  /** 令牌类型 */
  tokenType?: string;
}
