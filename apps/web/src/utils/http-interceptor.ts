import { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TokenManager } from './token-manager';
import { authControllerRefreshToken } from '@/services/auth/auth';
import type {
  AuthError,
  RedirectOptions
} from '@/types/auth-types';
import { AuthErrorType } from '@/types/auth-types';
import {
  validateJwtToken,
  getTokenRemainingTime,
  createAuthError} from './auth-utils';
import {
  DEFAULT_PATHS,
  buildLoginRedirectUrl
} from './path-utils';

// HTTP拦截器相关类型定义
interface QueuedRequest {
  resolve: (value?: string | null) => void;
  reject: (reason?: AuthError | AxiosError) => void;
}

interface HttpErrorContext {
  isLoginRequest: boolean;
  isProtectedResource: boolean;
  hasAuthHeader: boolean;
  originalUrl?: string;
}

interface TokenRefreshResult {
  success: boolean;
  token?: string;
  error?: AuthError;
}

// 用于存储路由实例的变量
let routerInstance: any = null;

// 用于防止多个刷新请求同时进行
let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

/**
 * 设置路由实例
 * 必须在应用启动时调用，用于在拦截器中进行路由导航
 * @param router - Next.js 路由实例
 */
export function setRouterInstance(router: any): void {
  routerInstance = router;
}

/**
 * 获取HTTP错误上下文信息
 * @param error - Axios错误对象
 * @returns 错误上下文信息
 */
function getErrorContext(error: AxiosError): HttpErrorContext {
  const originalUrl = error.config?.url;
  const authHeader = error.config?.headers?.Authorization;
  
  return {
    isLoginRequest: originalUrl?.includes('/auth/login') || originalUrl?.includes('/login') || false,
    isProtectedResource: !originalUrl?.includes('/auth/') || false,
    hasAuthHeader: Boolean(authHeader && authHeader.toString().startsWith('Bearer ')),
    originalUrl
  };
}

/**
 * 处理队列中的失败请求
 * @param error - 错误对象（如果有）
 * @param token - 新的访问令牌（如果刷新成功）
 */
function processQueue(error: AuthError | AxiosError | null = null, token: string | null = null): void {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
}

/**
 * 刷新访问令牌
 * @returns 刷新结果，包含成功状态和新令牌或错误信息
 */
async function refreshAccessToken(): Promise<TokenRefreshResult> {
  const refreshToken = TokenManager.getRefreshToken();
  
  if (!refreshToken) {
    const error = createAuthError(
      AuthErrorType.INVALID_TOKEN,
      'No refresh token available',
      { context: 'token_refresh' }
    );
    return { success: false, error };
  }

  // 验证refresh token是否有效
  const validation = validateJwtToken(refreshToken);
  if (!validation.isValid) {
    const error = createAuthError(
      AuthErrorType.INVALID_TOKEN,
      'Refresh token is invalid or expired',
      { 
        context: 'token_refresh',
        reason: validation.error
      }
    );
    TokenManager.clearAll();
    return { success: false, error };
  }

  try {
    const response = await authControllerRefreshToken({
      refreshToken
    });
    
    const newAccessToken = response.accessToken;
    
    // 验证新的访问令牌
    const newTokenValidation = validateJwtToken(newAccessToken);
    if (!newTokenValidation.isValid) {
      const error = createAuthError(
        AuthErrorType.INVALID_TOKEN,
        'Received invalid access token from server',
        { context: 'token_refresh' }
      );
      return { success: false, error };
    }
    
    // 更新访问令牌
    TokenManager.updateAccessToken(newAccessToken);
    
    return { success: true, token: newAccessToken };
  } catch (error) {
    // 刷新失败，清除所有认证数据
    TokenManager.clearAll();
    
    const authError = createAuthError(
      AuthErrorType.REFRESH_FAILED,
      'Failed to refresh access token',
      { 
        context: 'token_refresh',
        originalError: error
      }
    );
    
    return { success: false, error: authError };
  }
}

/**
 * 配置请求拦截器
 * 自动添加认证头
 */
export function setupRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = TokenManager.getAccessToken();
      
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

/**
 * 检查401错误是否由于token过期导致
 * 通过检查错误响应中的具体信息和token状态来判断
 * @param error - Axios错误对象
 * @returns 是否为token过期错误
 */
function isTokenExpiredError(error: AxiosError): boolean {
  const errorData = error.response?.data as any;
  const context = getErrorContext(error);
  
  // 检查服务器返回的错误标识
  const serverIndicatesExpired = (
    errorData?.code === 'TOKEN_EXPIRED' || 
    errorData?.message?.includes('token expired') ||
    errorData?.message?.includes('jwt expired') ||
    errorData?.error === 'token_expired' ||
    errorData?.message?.includes('jwt malformed')
  );
  
  if (serverIndicatesExpired) {
    return true;
  }
  
  // 如果有Authorization头，检查本地token状态
  if (context.hasAuthHeader) {
    const accessToken = TokenManager.getAccessToken();
    if (accessToken) {
      const validation = validateJwtToken(accessToken);
      // 如果本地token无效或即将过期，认为是token过期
      if (!validation.isValid || getTokenRemainingTime(accessToken) <= 0) {
        return true;
      }
    }
    return true; // 有auth header但401，很可能是token问题
  }
  
  return false;
}

/**
 * 处理认证失败后的重定向
 * @param context - 错误上下文
 * @param options - 重定向选项
 */
function handleAuthFailureRedirect(context: HttpErrorContext, options: Partial<RedirectOptions> = {}): void {
  // 登录请求失败不需要重定向
  if (context.isLoginRequest) {
    return;
  }
  
  console.warn('Authentication failed, redirecting to login');
  
  const redirectUrl = buildLoginRedirectUrl(context.originalUrl || '/', {
    searchParams: {
      reason: 'authentication_required',
      ...options.searchParams
    }
  });
  
  // 使用路由导航而非window.location
  if (routerInstance) {
    routerInstance.push(redirectUrl);
  } else {
    console.error('Router instance not set. Please call setRouterInstance() in your app.');
    // 备用方案：使用window.location
    if (typeof window !== 'undefined') {
      window.location.href = redirectUrl;
    }
  }
}

/**
 * 配置响应拦截器
 * 智能处理401/403错误，区分token过期和权限问题
 */
export function setupResponseInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      
      // 处理401未授权错误
      if (error.response?.status === 401 && !originalRequest._retry) {
        // 检查是否是token过期导致的401错误
        if (isTokenExpiredError(error)) {
          // Token过期，尝试刷新
          if (isRefreshing) {
            // 如果正在刷新token，将请求加入队列
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(originalRequest);
              }
              return Promise.reject(error);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshResult = await refreshAccessToken();
            
            if (refreshResult.success && refreshResult.token) {
              // 处理队列中的请求
              processQueue(null, refreshResult.token);
              
              // 重试原始请求
              originalRequest.headers.Authorization = `Bearer ${refreshResult.token}`;
              return axiosInstance(originalRequest);
            } else {
              // 刷新失败，处理队列并重定向到登录页
              const refreshError = refreshResult.error || createAuthError(
                AuthErrorType.REFRESH_FAILED,
                'Token refresh failed'
              );
              processQueue(refreshError, null);
            
            console.warn('Token refresh failed, redirecting to login');
            
            const context = getErrorContext(error);
            handleAuthFailureRedirect(context, {
              to: DEFAULT_PATHS.loginPath,
              searchParams: {
                reason: 'token_refresh_failed'
              }
            });
            
            return Promise.reject(refreshError);
            }
          } catch (refreshError) {
            // 处理意外错误
            const authError = createAuthError(
              AuthErrorType.REFRESH_FAILED,
              'Unexpected error during token refresh',
              { originalError: refreshError }
            );
            processQueue(authError, null);
            
            console.warn('Token refresh failed, redirecting to login');
            
            const context = getErrorContext(error);
            handleAuthFailureRedirect(context, {
              to: DEFAULT_PATHS.loginPath,
              searchParams: {
                reason: 'token_refresh_failed'
              }
            });
            
            return Promise.reject(authError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // 非token过期的401错误（如用户名密码错误、账户被禁用等）
          console.warn('Authentication failed - not a token expiration issue');
          
          // 对于登录接口的401错误，不需要重定向
          const isLoginRequest = originalRequest.url?.includes('/auth/login') || 
                                originalRequest.url?.includes('/login');
          
          if (!isLoginRequest) {
            // 非登录请求的认证失败，可能需要重新登录
            console.warn('Authentication required for protected resource');
            
            // 可以选择是否重定向到登录页，或者让业务代码处理
            // 这里选择不自动重定向，让业务代码决定如何处理
          }
          
          return Promise.reject(error);
        }
      }
      
      // 处理403权限不足错误
      if (error.response?.status === 403) {
        console.warn('Access forbidden - insufficient permissions');
        
        // 403错误通常是权限不足，不是token问题，不应该刷新token
        // 可以选择重定向到权限不足页面或显示错误消息
        const errorData = error.response?.data as any;
        
        // 记录详细的权限错误信息
        if (errorData?.message) {
          console.warn('Permission denied:', errorData.message);
        }
        
        // 可以根据需要重定向到权限不足页面
        // if (routerInstance) {
        //   routerInstance.push('/unauthorized');
        // }
        
        return Promise.reject(error);
      }
      
      // 处理其他错误
      return Promise.reject(error);
    }
  );
}

/**
 * 一键配置HTTP拦截器
 * 同时设置请求和响应拦截器
 */
export function setupHttpInterceptors(axiosInstance: AxiosInstance) {
  setupRequestInterceptor(axiosInstance);
  setupResponseInterceptor(axiosInstance);
}

/**
 * 错误处理工具函数
 * 根据HTTP状态码和错误信息生成用户友好的错误消息
 * @param error - Axios错误对象
 * @returns 用户友好的错误消息
 */
export function getErrorMessage(error: AxiosError): string {
  const context = getErrorContext(error);
  
  if (error.response) {
    const status = error.response.status;
    const message = (error.response.data as any)?.message || error.message;
    
    switch (status) {
      case 400:
        return `请求参数错误: ${message}`;
      case 401:
        // 根据具体错误信息和上下文提供更准确的提示
        if (context.isLoginRequest) {
          return `登录失败: ${message || '用户名或密码错误'}`;
        }
        if (isTokenExpiredError(error)) {
          return '登录已过期，请重新登录';
        }
        return `认证失败: ${message || '请重新登录'}`;
      case 403:
        return `权限不足: ${message || '无法访问该资源'}`;
      case 404:
        return context.isProtectedResource 
          ? '请求的资源不存在或已被删除'
          : '页面不存在';
      case 422:
        return `数据验证失败: ${message}`;
      case 429:
        return '请求过于频繁，请稍后重试';
      case 500:
        return '服务器内部错误，请稍后重试';
      case 502:
        return '网关错误，请稍后重试';
      case 503:
        return '服务暂时不可用，请稍后重试';
      case 504:
        return '请求超时，请稍后重试';
      default:
        return `请求失败 (${status}): ${message}`;
    }
  } else if (error.request) {
    return '网络连接失败，请检查网络设置';
  } else {
    return `请求配置错误: ${error.message}`;
  }
}

/**
 * 创建HTTP错误的AuthError对象
 * @param error - Axios错误对象
 * @returns AuthError对象
 */
export function createHttpAuthError(error: AxiosError): AuthError {
  const context = getErrorContext(error);
  const status = error.response?.status;
  
  let errorType: AuthErrorType;
  let message: string;
  
  switch (status) {
    case 401:
      if (isTokenExpiredError(error)) {
        errorType = AuthErrorType.TOKEN_EXPIRED;
        message = 'Access token has expired';
      } else if (context.isLoginRequest) {
        errorType = AuthErrorType.INVALID_TOKEN;
        message = 'Login credentials are invalid';
      } else {
        errorType = AuthErrorType.INVALID_TOKEN;
        message = 'Authentication required';
      }
      break;
    case 403:
      errorType = AuthErrorType.INSUFFICIENT_PERMISSIONS;
      message = 'Insufficient permissions';
      break;
    default:
      errorType = AuthErrorType.NETWORK_ERROR;
      message = 'HTTP request failed';
  }
  
  return createAuthError(errorType, message, {
    httpStatus: status,
    originalError: error,
    context: context.originalUrl,
    isLoginRequest: context.isLoginRequest
  });
}

/**
 * 检查是否为认证相关错误
 * @param error - Axios错误对象
 * @returns 是否为认证错误
 */
export function isAuthError(error: AxiosError): boolean {
  return error.response?.status === 401 || error.response?.status === 403;
}

/**
 * 检查是否为网络错误
 * @param error - Axios错误对象
 * @returns 是否为网络错误
 */
export function isNetworkError(error: AxiosError): boolean {
  return !error.response && !!error.request;
}

/**
 * 检查是否为服务器错误
 * @param error - Axios错误对象
 * @returns 是否为服务器错误
 */
export function isServerError(error: AxiosError): boolean {
  const status = error.response?.status;
  return status ? status >= 500 : false;
}

/**
 * 检查是否为客户端错误
 * @param error - Axios错误对象
 * @returns 是否为客户端错误
 */
export function isClientError(error: AxiosError): boolean {
  const status = error.response?.status;
  return status ? status >= 400 && status < 500 : false;
}

/**
 * 检查是否为token过期错误
 * @param error - Axios错误对象
 * @returns 是否为token过期错误
 */
export function isTokenExpired(error: AxiosError): boolean {
  return error.response?.status === 401 && isTokenExpiredError(error);
}

/**
 * 检查是否为权限不足错误
 * @param error - Axios错误对象
 * @returns 是否为权限不足错误
 */
export function isPermissionDenied(error: AxiosError): boolean {
  return error.response?.status === 403;
}

/**
 * 检查是否为请求超时错误
 * @param error - Axios错误对象
 * @returns 是否为超时错误
 */
export function isTimeoutError(error: AxiosError): boolean {
  return error.code === 'ECONNABORTED' || error.response?.status === 504;
}

/**
 * 检查是否需要用户重新登录
 * 包括token过期和某些特定的认证失败情况
 * @param error - Axios错误对象
 * @returns 是否需要重新认证
 */
export function requiresReauth(error: AxiosError): boolean {
  const context = getErrorContext(error);
  
  if (error.response?.status === 401) {
    // Token过期需要重新认证
    if (isTokenExpiredError(error)) {
      return true;
    }
    
    // 受保护资源的认证失败（非登录接口）需要重新认证
    return !context.isLoginRequest && context.isProtectedResource;
  }
  
  return false;
}

/**
 * 检查错误是否可以重试
 * @param error - Axios错误对象
 * @returns 是否可以重试
 */
export function isRetryableError(error: AxiosError): boolean {
  // 网络错误可以重试
  if (isNetworkError(error)) {
    return true;
  }
  
  // 某些服务器错误可以重试
  const status = error.response?.status;
  if (status) {
    return status === 502 || status === 503 || status === 504;
  }
  
  // 超时错误可以重试
  return isTimeoutError(error);
}

/**
 * 获取错误的严重程度
 * @param error - Axios错误对象
 * @returns 错误严重程度
 */
export function getErrorSeverity(error: AxiosError): 'low' | 'medium' | 'high' | 'critical' {
  if (isNetworkError(error) || isTimeoutError(error)) {
    return 'medium';
  }
  
  const status = error.response?.status;
  if (!status) {
    return 'medium';
  }
  
  if (status >= 500) {
    return 'high';
  }
  
  if (status === 401 || status === 403) {
    return 'high';
  }
  
  if (status >= 400) {
    return 'medium';
  }
  
  return 'low';
}