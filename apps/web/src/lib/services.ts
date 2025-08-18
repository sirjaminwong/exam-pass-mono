import { useMutation, useQuery, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import apiClient from './axios';
import { queryKeys } from './react-query';
import type { AxiosResponse, AxiosError } from 'axios';

// 基础类型定义
type ApiResponse<T = any> = AxiosResponse<T>;
type ApiError = AxiosError;

// ============= App Controller =============

/**
 * 获取Hello消息
 */
export const useGetHello = (
  options?: Omit<UseQueryOptions<ApiResponse<string>, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['hello'],
    queryFn: () => apiClient.get<string>('/'),
    ...options,
  });
};

// ============= Users Controller =============

/**
 * 获取所有用户列表
 */
export const useGetUsers = (
  options?: Omit<UseQueryOptions<ApiResponse<any[]>, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => apiClient.get<any[]>('/users'),
    ...options,
  });
};

/**
 * 根据ID获取用户详情
 */
export const useGetUser = (
  id: string,
  options?: Omit<UseQueryOptions<ApiResponse<any>, ApiError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => apiClient.get<any>(`/users/${id}`),
    enabled: !!id, // 只有当id存在时才执行查询
    ...options,
  });
};

/**
 * 创建新用户
 */
export const useCreateUser = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, any>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: any) => apiClient.post<any>('/users', userData),
    onSuccess: () => {
      // 创建成功后，使用户列表缓存失效
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
    ...options,
  });
};

/**
 * 更新用户信息
 */
export const useUpdateUser = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, { id: string; data: any }>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiClient.patch<any>(`/users/${id}`, data),
    onSuccess: (_, variables) => {
      // 更新成功后，使相关缓存失效
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
    ...options,
  });
};

/**
 * 删除用户
 */
export const useDeleteUser = (
  options?: UseMutationOptions<ApiResponse<any>, ApiError, string>
) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiClient.delete<any>(`/users/${id}`),
    onSuccess: (_, id) => {
      // 删除成功后，使相关缓存失效
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
    ...options,
  });
};

// ============= 工具函数 =============

/**
 * 预取用户列表数据
 */
export const prefetchUsers = async (queryClient: ReturnType<typeof useQueryClient>) => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => apiClient.get<any[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
};

/**
 * 预取用户详情数据
 */
export const prefetchUser = async (
  queryClient: ReturnType<typeof useQueryClient>,
  id: string
) => {
  await queryClient.prefetchQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => apiClient.get<any>(`/users/${id}`),
    staleTime: 5 * 60 * 1000, // 5分钟
  });
};

// ============= 错误处理工具 =============

/**
 * 通用错误处理函数
 */
export const handleApiError = (error: ApiError): string => {
  if (error.response) {
    // 服务器响应了错误状态码
    const status = error.response.status;
    const message = (error.response.data as any)?.message || error.message;
    
    switch (status) {
      case 400:
        return `请求参数错误: ${message}`;
      case 401:
        return '未授权访问，请重新登录';
      case 403:
        return '权限不足，无法访问该资源';
      case 404:
        return '请求的资源不存在';
      case 500:
        return '服务器内部错误，请稍后重试';
      default:
        return `请求失败: ${message}`;
    }
  } else if (error.request) {
    // 请求已发出但没有收到响应
    return '网络连接失败，请检查网络设置';
  } else {
    // 其他错误
    return `请求配置错误: ${error.message}`;
  }
};