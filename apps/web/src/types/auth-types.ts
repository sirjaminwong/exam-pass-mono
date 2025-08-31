/**
 * 认证相关的类型定义
 */

/**
 * JWT Token Payload 接口
 */
export interface JwtPayload {
  /** 用户ID */
  sub?: string;
  /** 用户邮箱 */
  email?: string;
  /** 用户角色 */
  role?: string;
  /** 签发时间 (Unix timestamp) */
  iat: number;
  /** 过期时间 (Unix timestamp) */
  exp: number;
  /** 签发者 */
  iss?: string;
  /** 受众 */
  aud?: string;
  /** JWT ID */
  jti?: string;
  /** 其他自定义字段 */
  [key: string]: any;
}

/**
 * Token 对象接口
 */
export interface AuthTokens {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
}

/**
 * Token 验证结果
 */
export interface TokenValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 是否过期 */
  isExpired: boolean;
  /** 解码后的payload（如果有效） */
  payload?: JwtPayload;
  /** 错误信息（如果无效） */
  error?: string;
}

/**
 * 认证状态枚举
 */
export enum AuthStatus {
  /** 未认证 */
  UNAUTHENTICATED = 'unauthenticated',
  /** 已认证 */
  AUTHENTICATED = 'authenticated',
  /** 认证中 */
  AUTHENTICATING = 'authenticating',
  /** Token过期 */
  TOKEN_EXPIRED = 'token_expired',
  /** 认证失败 */
  AUTH_FAILED = 'auth_failed'
}

/**
 * 路径类型枚举
 */
export enum PathType {
  /** 受保护路径 */
  PROTECTED = 'protected',
  /** 访客路径 */
  GUEST = 'guest',
  /** 公开路径 */
  PUBLIC = 'public',
  /** API路径 */
  API = 'api',
  /** 静态资源路径 */
  STATIC = 'static'
}

/**
 * 路径配置接口
 */
export interface PathConfig {
  /** 路径列表 */
  paths: string[];
  /** 路径类型 */
  type: PathType;
  /** 是否需要精确匹配 */
  exact?: boolean;
}

/**
 * 路径匹配结果
 */
export interface PathMatchResult {
  /** 是否匹配 */
  matches: boolean;
  /** 匹配的路径类型 */
  type?: PathType;
  /** 匹配的具体路径 */
  matchedPath?: string;
}

/**
 * 认证错误类型
 */
export enum AuthErrorType {
  /** Token无效 */
  INVALID_TOKEN = 'invalid_token',
  /** Token过期 */
  TOKEN_EXPIRED = 'token_expired',
  /** 刷新Token失败 */
  REFRESH_FAILED = 'refresh_failed',
  /** 权限不足 */
  INSUFFICIENT_PERMISSIONS = 'insufficient_permissions',
  /** 网络错误 */
  NETWORK_ERROR = 'network_error',
  /** 未知错误 */
  UNKNOWN_ERROR = 'unknown_error'
}

/**
 * 认证错误接口
 */
export interface AuthError {
  /** 错误类型 */
  type: AuthErrorType;
  /** 错误消息 */
  message: string;
  /** 原始错误对象 */
  originalError?: any;
  /** 错误代码 */
  code?: string;
}

/**
 * 中间件重定向选项
 */
export interface RedirectOptions {
  /** 重定向目标路径 */
  to: string;
  /** 是否保存原始路径用于登录后重定向 */
  saveOriginalPath?: boolean;
  /** 查询参数 */
  searchParams?: Record<string, string>;
}

/**
 * 认证上下文状态接口
 */
export interface AuthContextState {
  /** 当前用户信息 */
  user: any | null;
  /** 是否正在加载 */
  isLoading: boolean;
  /** 是否已认证 */
  isAuthenticated: boolean;
  /** 最后一次错误 */
  lastError?: AuthError;
}

/**
 * 认证上下文操作接口
 */
export interface AuthContextActions {
  /** 登录 */
  login: (tokens: AuthTokens, user: any) => void;
  /** 登出 */
  logout: () => void;
  /** 刷新用户信息 */
  refreshUser: () => void;
  /** 清除错误 */
  clearError: () => void;
}

/**
 * 完整的认证上下文接口
 */
export interface AuthContextType extends AuthContextState, AuthContextActions {}