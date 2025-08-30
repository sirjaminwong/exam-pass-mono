import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

/**
 * 认证守卫 Hook
 * 用于保护需要登录的页面，替代高阶组件的方式
 * 
 * @param redirectTo - 未认证时重定向的路径，默认为 '/login'
 * @returns 认证状态和加载状态
 */
export function useAuthGuard(redirectTo: string = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    // 是否应该显示页面内容（已认证或仍在加载中）
    shouldShowContent: isAuthenticated || isLoading,
  };
}

/**
 * 反向认证守卫 Hook
 * 用于保护不需要登录的页面（如登录页、注册页）
 * 如果用户已登录，则重定向到指定页面
 * 
 * @param redirectTo - 已认证时重定向的路径，默认为 '/dashboard'
 * @returns 认证状态和加载状态
 */
export function useGuestGuard(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 只有在加载完成且已认证时才重定向
    if (!isLoading  && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    // 是否应该显示页面内容（未认证或仍在加载中）
    shouldShowContent: !isAuthenticated || isLoading,
  };
}