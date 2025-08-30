'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthControllerGetProfile, useAuthControllerLogout } from '@/services/auth/auth';
import { TokenManager } from '@/utils/token-manager';
import { setRouterInstance } from '@/utils/http-interceptor';
import type { UserProfileDto } from '@/models';

interface AuthContextType {
  user: UserProfileDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (tokens: { accessToken: string; refreshToken: string }, user: UserProfileDto) => void;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // 获取用户信息的查询
  const { data: user, isLoading: profileLoading, refetch: refetchProfile } = useAuthControllerGetProfile({
    query: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
    },
  });

  console.log('Auth context: profileData', profileLoading);

  // 登出mutation
  const logoutMutation = useAuthControllerLogout({
    mutation: {
      onSettled: () => {
        // 无论成功失败都清除本地状态
        clearAuthData();
      }
    }
  });

  // 清除认证数据
  function clearAuthData() {
    TokenManager.clearAll();
  }

  // 登录函数
  const login = (tokens: { accessToken: string; refreshToken: string }, userData: UserProfileDto) => {
    TokenManager.setAuthData(tokens);
  };

  // 登出函数
  const logout = () => {
    const accessToken = TokenManager.getAccessToken();
    if (accessToken) {
      // 调用服务器登出API
      logoutMutation.mutate();
    } else {
      // 如果没有token，直接清除本地数据
      clearAuthData();
    }
    router.push('/login');
  };

  const refreshUser = () => {
    refetchProfile();
  };

  useEffect(() => {
    setRouterInstance(router);
  }, [router]);



  const value: AuthContextType = {
    user: user || null,
    isLoading: profileLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

