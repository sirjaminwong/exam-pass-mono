import { jwtDecode } from 'jwt-decode';
import type {
  JwtPayload,
  TokenValidationResult,
  AuthError
} from '@/types/auth-types';
import {
  AuthStatus,
  AuthErrorType
} from '@/types/auth-types';

/**
 * 解码JWT token
 * @param token - JWT token字符串
 * @returns 解码后的payload或null
 */
export function decodeJwtToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.warn('Failed to decode JWT token:', error);
    return null;
  }
}

/**
 * 检查token是否过期
 * @param payload - JWT payload
 * @param bufferSeconds - 提前多少秒认为过期（默认30秒）
 * @returns 是否过期
 */
export function isTokenExpired(payload: JwtPayload, bufferSeconds: number = 30): boolean {
  if (!payload.exp) {
    return true; // 没有过期时间，认为已过期
  }
  
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < (currentTime + bufferSeconds);
}

/**
 * 验证JWT token的有效性
 * @param token - JWT token字符串
 * @param bufferSeconds - 提前多少秒认为过期
 * @returns 验证结果
 */
export function validateJwtToken(token: string, bufferSeconds?: number): TokenValidationResult {
  if (!token) {
    return {
      isValid: false,
      isExpired: false,
      error: 'Token is empty or null'
    };
  }

  const payload = decodeJwtToken(token);
  
  if (!payload) {
    return {
      isValid: false,
      isExpired: false,
      error: 'Invalid token format'
    };
  }

  const expired = isTokenExpired(payload, bufferSeconds);
  
  return {
    isValid: !expired,
    isExpired: expired,
    payload,
    error: expired ? 'Token has expired' : undefined
  };
}

/**
 * 从token中提取用户信息
 * @param token - JWT token字符串
 * @returns 用户信息对象或null
 */
export function extractUserFromToken(token: string): Partial<JwtPayload> | null {
  const payload = decodeJwtToken(token);
  
  if (!payload) {
    return null;
  }

  return {
    sub: payload.sub,
    email: payload.email,
    role: payload.role,
    iat: payload.iat,
    exp: payload.exp
  };
}

/**
 * 检查用户是否有指定角色
 * @param token - JWT token字符串
 * @param requiredRole - 需要的角色
 * @returns 是否有权限
 */
export function hasRole(token: string, requiredRole: string): boolean {
  const payload = decodeJwtToken(token);
  
  if (!payload || !payload.role) {
    return false;
  }

  // 支持单个角色或角色数组
  if (Array.isArray(payload.role)) {
    return payload.role.includes(requiredRole);
  }
  
  return payload.role === requiredRole;
}

/**
 * 检查用户是否有任意一个指定角色
 * @param token - JWT token字符串
 * @param roles - 角色列表
 * @returns 是否有权限
 */
export function hasAnyRole(token: string, roles: string[]): boolean {
  return roles.some(role => hasRole(token, role));
}

/**
 * 检查用户是否有所有指定角色
 * @param token - JWT token字符串
 * @param roles - 角色列表
 * @returns 是否有权限
 */
export function hasAllRoles(token: string, roles: string[]): boolean {
  return roles.every(role => hasRole(token, role));
}

/**
 * 获取token的剩余有效时间（秒）
 * @param token - JWT token字符串
 * @returns 剩余秒数，如果已过期或无效则返回0
 */
export function getTokenRemainingTime(token: string): number {
  const payload = decodeJwtToken(token);
  
  if (!payload || !payload.exp) {
    return 0;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const remainingTime = payload.exp - currentTime;
  
  return Math.max(0, remainingTime);
}

/**
 * 判断是否需要刷新token
 * @param token - JWT token字符串
 * @param refreshThresholdMinutes - 提前多少分钟刷新（默认5分钟）
 * @returns 是否需要刷新
 */
export function shouldRefreshToken(token: string, refreshThresholdMinutes: number = 5): boolean {
  const remainingTime = getTokenRemainingTime(token);
  const thresholdSeconds = refreshThresholdMinutes * 60;
  
  return remainingTime > 0 && remainingTime <= thresholdSeconds;
}

/**
 * 创建认证错误对象
 * @param type - 错误类型
 * @param message - 错误消息
 * @param originalError - 原始错误对象
 * @param code - 错误代码
 * @returns 认证错误对象
 */
export function createAuthError(
  type: AuthErrorType,
  message: string,
  originalError?: any,
  code?: string
): AuthError {
  return {
    type,
    message,
    originalError,
    code
  };
}

/**
 * 根据错误类型获取用户友好的错误消息
 * @param error - 认证错误对象
 * @returns 用户友好的错误消息
 */
export function getAuthErrorMessage(error: AuthError): string {
  switch (error.type) {
    case AuthErrorType.INVALID_TOKEN:
      return '登录信息无效，请重新登录';
    case AuthErrorType.TOKEN_EXPIRED:
      return '登录已过期，请重新登录';
    case AuthErrorType.REFRESH_FAILED:
      return '刷新登录状态失败，请重新登录';
    case AuthErrorType.INSUFFICIENT_PERMISSIONS:
      return '权限不足，无法访问该资源';
    case AuthErrorType.NETWORK_ERROR:
      return '网络连接失败，请检查网络设置';
    case AuthErrorType.UNKNOWN_ERROR:
    default:
      return error.message || '发生未知错误，请稍后重试';
  }
}

/**
 * 根据token验证结果确定认证状态
 * @param validationResult - token验证结果
 * @returns 认证状态
 */
export function getAuthStatusFromValidation(validationResult: TokenValidationResult): AuthStatus {
  if (!validationResult.isValid) {
    if (validationResult.isExpired) {
      return AuthStatus.TOKEN_EXPIRED;
    }
    return AuthStatus.AUTH_FAILED;
  }
  
  return AuthStatus.AUTHENTICATED;
}

/**
 * 安全地从localStorage获取token
 * @param key - 存储键名
 * @returns token字符串或null
 */
export function getTokenFromStorage(key: string): string | null {
  if (typeof window === 'undefined') {
    return null; // SSR环境
  }
  
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to get token from localStorage:`, error);
    return null;
  }
}

/**
 * 安全地向localStorage存储token
 * @param key - 存储键名
 * @param token - token字符串
 * @returns 是否存储成功
 */
export function setTokenToStorage(key: string, token: string): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境
  }
  
  try {
    localStorage.setItem(key, token);
    return true;
  } catch (error) {
    console.warn(`Failed to set token to localStorage:`, error);
    return false;
  }
}

/**
 * 安全地从localStorage移除token
 * @param key - 存储键名
 * @returns 是否移除成功
 */
export function removeTokenFromStorage(key: string): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR环境
  }
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove token from localStorage:`, error);
    return false;
  }
}

/**
 * 格式化token过期时间为可读字符串
 * @param token - JWT token字符串
 * @returns 格式化的过期时间字符串
 */
export function formatTokenExpiry(token: string): string {
  const payload = decodeJwtToken(token);
  
  if (!payload || !payload.exp) {
    return '未知';
  }

  const expiryDate = new Date(payload.exp * 1000);
  return expiryDate.toLocaleString();
}