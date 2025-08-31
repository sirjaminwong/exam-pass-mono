'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthControllerGetProfile, useAuthControllerLogout } from '@/services/auth/auth';
import { TokenManager } from '@/utils/token-manager';
import { setRouterInstance } from '@/utils/http-interceptor';
import type { UserProfileDto } from '@/models';
import type {
  AuthContextType,
  AuthTokens,
  AuthError
} from '@/types/auth-types';
import {
  AuthStatus,
  AuthErrorType
} from '@/types/auth-types';
import {
  validateJwtToken,
  getTokenFromStorage,
  createAuthError,
  getAuthStatusFromValidation
} from '@/utils/auth-utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED);
  const [lastError, setLastError] = useState<AuthError | undefined>();

  // 获取用户信息的查询
  const { data: user, isLoading: profileLoading, refetch: refetchProfile, error: profileError } = useAuthControllerGetProfile({
    query: {
      retry: false,
      staleTime: 5 * 60 * 1000, // 5分钟内不重新获取
      enabled: authStatus === AuthStatus.AUTHENTICATED, // 只有在认证状态下才获取用户信息
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
  const clearAuthData = useCallback(() => {
    TokenManager.clearAll();
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    setLastError(undefined);
  }, []);

  // 设置认证错误
  const setAuthError = useCallback((error: AuthError) => {
    setLastError(error);
    if (error.type === AuthErrorType.TOKEN_EXPIRED) {
      setAuthStatus(AuthStatus.TOKEN_EXPIRED);
    } else {
      setAuthStatus(AuthStatus.AUTH_FAILED);
    }
  }, []);

  // 清除错误
  const clearError = useCallback(() => {
    setLastError(undefined);
  }, []);

  // 验证当前token状态
  const validateCurrentToken = useCallback(() => {
    const accessToken = getTokenFromStorage('accessToken');
    
    if (!accessToken) {
      setAuthStatus(AuthStatus.UNAUTHENTICATED);
      return false;
    }

    const validation = validateJwtToken(accessToken);
    const status = getAuthStatusFromValidation(validation);
    
    setAuthStatus(status);
    
    if (!validation.isValid) {
      const errorType = validation.isExpired ? AuthErrorType.TOKEN_EXPIRED : AuthErrorType.INVALID_TOKEN;
      setAuthError(createAuthError(errorType, validation.error || 'Token validation failed'));
      return false;
    }

    return true;
  }, [setAuthError]);

  // 登录函数
  const login = useCallback((tokens: AuthTokens, userData: UserProfileDto) => {
    try {
      // 验证token有效性
      const validation = validateJwtToken(tokens.accessToken);
      
      if (!validation.isValid) {
        const errorType = validation.isExpired ? AuthErrorType.TOKEN_EXPIRED : AuthErrorType.INVALID_TOKEN;
        setAuthError(createAuthError(errorType, validation.error || 'Invalid token provided'));
        return;
      }

      TokenManager.setAuthData(tokens);
      setAuthStatus(AuthStatus.AUTHENTICATED);
      setLastError(undefined);
    } catch (error) {
      setAuthError(createAuthError(
        AuthErrorType.UNKNOWN_ERROR,
        'Failed to process login tokens',
        error
      ));
    }
  }, [setAuthError]);

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
    
    router.push('/login');
  }, [logoutMutation, clearAuthData, router]);

  // 刷新用户信息
  const refreshUser = useCallback(() => {
    if (authStatus === AuthStatus.AUTHENTICATED) {
      refetchProfile();
    }
  }, [authStatus, refetchProfile]);

  // 初始化时验证token
  useEffect(() => {
    validateCurrentToken();
  }, [validateCurrentToken]);

  // 设置路由实例
  useEffect(() => {
    setRouterInstance(router);
  }, [router]);

  // 处理用户信息获取错误
  useEffect(() => {
    if (profileError) {
      setAuthError(createAuthError(
        AuthErrorType.NETWORK_ERROR,
        'Failed to fetch user profile',
        profileError
      ));
    }
  }, [profileError, setAuthError]);

  // 计算最终的认证状态
  const isAuthenticated = authStatus === AuthStatus.AUTHENTICATED && !!user;
  const isLoading = profileLoading || authStatus === AuthStatus.AUTHENTICATING;

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated,
    status: authStatus,
    lastError,
    login,
    logout,
    refreshUser,
    clearError,
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

