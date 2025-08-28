'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
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
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);
  const router = useRouter();

  // 获取用户信息的查询
  const { data: profileData, isLoading: profileLoading, refetch: refetchProfile } = useAuthControllerGetProfile({
    query: {
      enabled: shouldFetchProfile, // 使用状态控制查询
      retry: false,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
    },
  });

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
    setUser(null);
    setShouldFetchProfile(false);
  }

  // 登录函数
  const login = (tokens: { accessToken: string; refreshToken: string }, userData: UserProfileDto) => {
    TokenManager.setAuthData(tokens);
    setUser(userData);
    setShouldFetchProfile(true);
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

  // 刷新用户信息
  const refreshUser = () => {
    refetchProfile();
  };

  // 设置路由实例供HTTP拦截器使用
  useEffect(() => {
    setRouterInstance(router);
  }, [router]);

  // 初始化时检查token并获取用户信息
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const accessToken = TokenManager.getAccessToken();
    console.log('Auth initialization:', { accessToken: !!accessToken });

    if (accessToken) {
      // 有token时，总是从服务器获取最新的用户信息
      setShouldFetchProfile(true);
    }
  }, []);

  // 当获取到新的用户信息时更新状态
  useEffect(() => {
    if (profileData && !profileLoading) {
      setUser(profileData);
    }
  }, [profileData, profileLoading]);


  const value: AuthContextType = {
    user,
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

