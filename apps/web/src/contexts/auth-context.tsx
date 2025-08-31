'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthControllerGetProfile, useAuthControllerLogout } from '@/services/auth/auth';
import { TokenManager } from '@/utils/token-manager';
import { setRouterInstance } from '@/utils/http-interceptor';
import type { UserProfileDto } from '@/models';
import type {
  AuthContextType,
  AuthTokens
} from '@/types/auth-types';
import {
  AuthStatus
} from '@/types/auth-types';
import {
  validateJwtToken,
  getTokenFromStorage,
} from '@/utils/auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED);
  const [user, setUser] = useState<UserProfileDto | null>(null);

  // 获取用户信息的查询
  const { data: profileData, isLoading: profileLoading, refetch: refetchProfile } = useAuthControllerGetProfile({
    query: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
      enabled: authStatus === AuthStatus.AUTHENTICATING, // 只有在验证中时才触发请求
    },
  });

  useLayoutEffect(() => {
    if (profileData) {
      setUser(profileData);
      setAuthStatus(AuthStatus.AUTHENTICATED);
    }
  }, [profileData]);

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
  const clearAuthData = useCallback(() => {
    TokenManager.clearAll();
  }, []);



  // 登录函数
  const login = useCallback((tokens: AuthTokens, userData: UserProfileDto) => {
    try {
      // 验证token有效性
      const validation = validateJwtToken(tokens.accessToken);
      
      if (!validation.isValid) {
        const newStatus = validation.isExpired ? AuthStatus.TOKEN_EXPIRED : AuthStatus.AUTH_FAILED;
        setAuthStatus(newStatus);
        return;
      }
      setUser(userData);
      setAuthStatus(AuthStatus.AUTHENTICATED);
      TokenManager.setAuthData(tokens);
    } catch (error) {
      setAuthStatus(AuthStatus.AUTH_FAILED);
    }
  }, []);

  // 登出函数
  const logout = useCallback(() => {
    const accessToken = TokenManager.getAccessToken();
    
    if (accessToken) {
      // 调用服务器登出API
      logoutMutation.mutate();
    } else {
      // 如果没有token，直接清除本地数据
      clearAuthData();
    }
    setUser(null);
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    router.push('/login');
  }, [logoutMutation, clearAuthData, router]);
  // 初始化时验证token
  useEffect(() => {
    const accessToken = getTokenFromStorage('accessToken');
    
    if (!accessToken) {
      setAuthStatus(AuthStatus.UNAUTHENTICATED);
      return;
    }

    const validation = validateJwtToken(accessToken);
    if (!validation.isValid) {
      const newStatus = validation.isExpired ? AuthStatus.TOKEN_EXPIRED : AuthStatus.AUTH_FAILED;
      setAuthStatus(newStatus);
      return;
    }

    setAuthStatus(AuthStatus.AUTHENTICATING);
  }, []);

  // 设置路由实例
  useEffect(() => {
    setRouterInstance(router);
  }, [router]);


  // 计算最终的认证状态
  const isAuthenticated = authStatus === AuthStatus.AUTHENTICATED && !!user;
  const isLoading = profileLoading;

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated,
    authStatus,
    login,
    logout,
    refreshUser: refetchProfile,
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

