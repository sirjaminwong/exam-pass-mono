'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

// React Query 配置
const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 数据过期时间（5分钟）
        staleTime: 5 * 60 * 1000,
        // 缓存时间（10分钟）
        gcTime: 10 * 60 * 1000,
        // 重试次数
        retry: 3,
        // 重试延迟
        retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
        // 窗口重新获得焦点时重新获取数据
        refetchOnWindowFocus: false,
        // 网络重连时重新获取数据
        refetchOnReconnect: true,
      },
      mutations: {
        // 重试次数
        retry: 1,
        // 重试延迟
        retryDelay: 1000,
      },
    },
  });
};

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // 使用 useState 确保 QueryClient 在客户端渲染时保持稳定
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 开发环境下显示 React Query DevTools */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

// 导出 QueryClient 实例创建函数，用于服务端渲染
export { createQueryClient };

// 常用的查询键工厂
export const queryKeys = {
  // 用户相关
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
  },
  // 可以根据需要添加更多实体的查询键
} as const;