import type { LoginResponseDtoUser } from './loginResponseDtoUser';
import type { LoginResponseDtoTokens } from './loginResponseDtoTokens';

export interface LoginResponseDto {
  /** 用户信息 */
  user: LoginResponseDtoUser;
  /** 令牌信息 */
  tokens: LoginResponseDtoTokens;
}
