import { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TokenManager } from './token-manager';
import { authControllerRefreshToken } from '@/services/auth/auth';

// 用于存储路由实例的变量
let routerInstance: any = null;

// 用于防止多个刷新请求同时进行
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

/**
 * 设置路由实例
 * 必须在应用启动时调用，用于在拦截器中进行路由导航
 */
export function setRouterInstance(router: any) {
  routerInstance = router;
}

/**
 * 处理队列中的失败请求
 */
function processQueue(error: any, token: string | null = null) {
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
 */
async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = TokenManager.getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await authControllerRefreshToken({
      refreshToken
    });
    
    const newAccessToken = response.accessToken;
    
    // 更新访问令牌
    TokenManager.updateAccessToken(newAccessToken);
    
    return newAccessToken;
  } catch (error) {
    // 刷新失败，清除所有认证数据
    TokenManager.clearAll();
    throw error;
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
 * 配置响应拦截器
 * 处理401/403错误，自动刷新token，使用路由导航
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
          const newAccessToken = await refreshAccessToken();
          
          if (newAccessToken) {
            // 处理队列中的请求
            processQueue(null, newAccessToken);
            
            // 重试原始请求
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          // 刷新失败，处理队列并重定向到登录页
          processQueue(refreshError, null);
          
          // 使用路由导航而非window.location
          if (routerInstance) {
            routerInstance.push('/login');
          } else {
            console.error('Router instance not set. Please call setRouterInstance() in your app.');
            // 备用方案：使用window.location
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
          
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      
      // 处理403权限不足错误
      if (error.response?.status === 403) {
        console.error('Access forbidden - insufficient permissions');
        
        // 可以选择重定向到权限不足页面或显示错误消息
        if (routerInstance) {
          // 可以重定向到权限不足页面
          // routerInstance.push('/unauthorized');
        }
        
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
 */
export function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    const status = error.response.status;
    const message = (error.response.data as any)?.message || error.message;
    
    switch (status) {
      case 400:
        return `请求参数错误: ${message}`;
      case 401:
        return '登录已过期，请重新登录';
      case 403:
        return '权限不足，无法访问该资源';
      case 404:
        return '请求的资源不存在';
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
 * 检查是否为认证相关错误
 */
export function isAuthError(error: AxiosError): boolean {
  return error.response?.status === 401 || error.response?.status === 403;
}

/**
 * 检查是否为网络错误
 */
export function isNetworkError(error: AxiosError): boolean {
  return !error.response && !!error.request;
}

/**
 * 检查是否为服务器错误
 */
export function isServerError(error: AxiosError): boolean {
  const status = error.response?.status;
  return status ? status >= 500 : false;
}