import { useAuth } from '@/contexts/auth-context';

/**
 * 认证守卫 Hook
 * 用于获取认证状态信息，路由保护由 middleware 处理
 * 
 * @returns 认证状态和加载状态
 */
export function useAuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    // 是否应该显示页面内容（已认证或仍在加载中）
    shouldShowContent: isAuthenticated || isLoading,
  };
}

/**
 * 访客守卫 Hook
 * 用于获取认证状态信息，路由保护由 middleware 处理
 * 
 * @returns 认证状态和加载状态
 */
export function useGuestGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    // 是否应该显示页面内容（未认证或仍在加载中）
    shouldShowContent: !isAuthenticated || isLoading,
  };
}