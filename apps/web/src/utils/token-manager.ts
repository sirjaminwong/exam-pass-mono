import { setCookie, getCookie, removeCookie } from './cookie';

// Token 配置常量
const TOKEN_CONFIG = {
  ACCESS_TOKEN: {
    name: 'accessToken',
    maxAge: 15 * 60, // 15分钟
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false, // 前端需要读取
  },
  REFRESH_TOKEN: {
    name: 'refreshToken', 
    maxAge: 7 * 24 * 60 * 60, // 7天
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false, // 前端需要读取
  }
} as const;

export interface TokenData {
  accessToken: string;
  refreshToken: string;
}

/**
 * 统一的Token管理工具
 * 使用cookie替代localStorage，提供类型安全的操作接口
 */
export class TokenManager {
  /**
   * 设置访问令牌
   */
  static setAccessToken(token: string): void {
    const config = TOKEN_CONFIG.ACCESS_TOKEN;
    setCookie(config.name, token, {
      expires: config.maxAge,
      path: config.path,
      secure: config.secure,
    });
  }

  /**
   * 获取访问令牌
   */
  static getAccessToken(): string | null {
    return getCookie(TOKEN_CONFIG.ACCESS_TOKEN.name) || null;
  }

  /**
   * 获取访问令牌（支持SSR）
   */
  static async getAccessTokenSSR(): Promise<string | null> {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const token = cookieStore.get(TOKEN_CONFIG.ACCESS_TOKEN.name);
      return token?.value || null;
    } catch (error) {
      // 在客户端环境下降级到普通方法
      return TokenManager.getAccessToken();
    }
  }

  /**
   * 设置刷新令牌
   */
  static setRefreshToken(token: string): void {
    const config = TOKEN_CONFIG.REFRESH_TOKEN;
    setCookie(config.name, token, {
      expires: config.maxAge,
      path: config.path,
      secure: config.secure,
    });
  }

  /**
   * 获取刷新令牌
   */
  static getRefreshToken(): string | null {
    return getCookie(TOKEN_CONFIG.REFRESH_TOKEN.name) || null;
  }

  /**
   * 设置完整的认证数据
   */
  static setAuthData(tokens: TokenData): void {
    TokenManager.setAccessToken(tokens.accessToken);
    TokenManager.setRefreshToken(tokens.refreshToken);
  }

  /**
   * 检查是否已认证（有有效的访问令牌）
   */
  static isAuthenticated(): boolean {
    return !!TokenManager.getAccessToken();
  }

  /**
   * 客户端专用的认证检查（确保在浏览器环境下执行）
   */
  static isAuthenticatedClient(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!TokenManager.getAccessToken();
  }

  /**
   * 检查是否已认证（支持SSR）
   */
  static async isAuthenticatedSSR(): Promise<boolean> {
    const token = await TokenManager.getAccessTokenSSR();
    return !!token;
  }

  /**
   * 检查是否有刷新令牌
   */
  static hasRefreshToken(): boolean {
    return !!TokenManager.getRefreshToken();
  }

  /**
   * 移除访问令牌
   */
  static removeAccessToken(): void {
    const config = TOKEN_CONFIG.ACCESS_TOKEN;
    removeCookie(config.name, {
      path: config.path,
    });
  }

  /**
   * 移除刷新令牌
   */
  static removeRefreshToken(): void {
    const config = TOKEN_CONFIG.REFRESH_TOKEN;
    removeCookie(config.name, {
      path: config.path,
    });
  }

  /**
   * 清除所有认证数据
   */
  static clearAll(): void {
    TokenManager.removeAccessToken();
    TokenManager.removeRefreshToken();
  }

  /**
   * 获取所有认证数据
   */
  static getAuthData(): {
    accessToken: string | null;
    refreshToken: string | null;
  } {
    return {
      accessToken: TokenManager.getAccessToken(),
      refreshToken: TokenManager.getRefreshToken(),
    };
  }

  /**
   * 更新访问令牌（通常在刷新后使用）
   */
  static updateAccessToken(newAccessToken: string): void {
    TokenManager.setAccessToken(newAccessToken);
  }

  /**
   * 检查认证数据的完整性
   */
  static validateAuthData(): boolean {
    const { accessToken } = TokenManager.getAuthData();
    return !!accessToken;
  }
}

// 导出便捷的函数接口
export const {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  setAuthData,
  isAuthenticated,
  hasRefreshToken,
  clearAll: clearAuthData,
  getAuthData,
  updateAccessToken,
  validateAuthData,
} = TokenManager;

// 默认导出TokenManager类
export default TokenManager;