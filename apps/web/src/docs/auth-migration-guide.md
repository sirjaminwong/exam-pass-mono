# 认证保护迁移指南

本指南展示如何从高阶组件 (HOC) 方式迁移到更现代的 React Hook 方式来实现页面认证保护。

## 为什么要迁移？

### 高阶组件的问题

1. **复杂性**: HOC 增加了组件层级，使调试变得困难
2. **类型推断**: TypeScript 中 HOC 的类型推断较为复杂
3. **可读性**: 代码意图不够直观
4. **灵活性**: 难以自定义认证逻辑
5. **现代性**: 不符合现代 React 的 Hook 优先理念

### Hook 方式的优势

1. **简洁性**: 代码更简洁，逻辑更清晰
2. **类型安全**: 更好的 TypeScript 支持
3. **可组合性**: 可以轻松组合多个 Hook
4. **可测试性**: 更容易进行单元测试
5. **性能**: 避免不必要的组件包装

## 迁移步骤

### 1. 创建认证 Hook

```typescript
// src/hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

/**
 * 认证守卫 Hook
 * 用于保护需要登录的页面
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
    shouldShowContent: isAuthenticated || isLoading,
  };
}

/**
 * 反向认证守卫 Hook
 * 用于保护不需要登录的页面（如登录页、注册页）
 */
export function useGuestGuard(redirectTo: string = '/dashboard') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    isLoading,
    shouldShowContent: !isAuthenticated || isLoading,
  };
}
```

### 2. 创建加载组件

```typescript
// src/components/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({ 
  text = '加载中...', 
  fullScreen = true, 
  className = '' 
}: LoadingSpinnerProps) {
  const baseClasses = "flex items-center justify-center";
  const containerClasses = fullScreen 
    ? `min-h-screen bg-gray-50 ${baseClasses}` 
    : `py-8 ${baseClasses}`;

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}
```

### 3. 迁移受保护的页面

#### 迁移前 (HOC 方式)

```typescript
// 旧的方式
import { withAuth } from '@/contexts/auth-context';

function DashboardPage() {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
}

// 使用 HOC 包装
export default withAuth(DashboardPage);
```

#### 迁移后 (Hook 方式)

```typescript
// 新的方式
import { useAuth } from '@/contexts/auth-context';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function DashboardPage() {
  const { user } = useAuth();
  const { shouldShowContent } = useAuthGuard();
  
  // 认证检查
  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }
  
  // 用户数据检查
  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* 页面内容 */}
    </div>
  );
}

// 直接导出，无需 HOC
export default DashboardPage;
```

### 4. 迁移访客页面（登录/注册）

#### 迁移前

```typescript
// 旧的方式
import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading || isAuthenticated) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 登录表单 */}
    </div>
  );
}

export default LoginPage;
```

#### 迁移后

```typescript
// 新的方式
import { useGuestGuard } from '@/hooks/useAuthGuard';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function LoginPage() {
  const { shouldShowContent } = useGuestGuard();
  
  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* 登录表单 */}
    </div>
  );
}

export default LoginPage;
```

## 高级用法

### 自定义重定向路径

```typescript
function AdminPage() {
  const { shouldShowContent } = useAuthGuard('/admin-login');
  
  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }
  
  // 页面内容
}
```

### 条件认证保护

```typescript
function ConditionalPage() {
  const { user } = useAuth();
  const { shouldShowContent } = useAuthGuard();
  const [requiresAuth, setRequiresAuth] = useState(true);
  
  if (requiresAuth && !shouldShowContent) {
    return <LoadingSpinner />;
  }
  
  // 页面内容
}
```

### 组合多个守卫

```typescript
function useAdminGuard() {
  const { user } = useAuth();
  const { shouldShowContent } = useAuthGuard();
  
  const isAdmin = user?.role === 'admin';
  
  useEffect(() => {
    if (shouldShowContent && !isAdmin) {
      router.push('/unauthorized');
    }
  }, [shouldShowContent, isAdmin]);
  
  return {
    shouldShowContent: shouldShowContent && isAdmin,
  };
}
```

## 测试

### Hook 测试

```typescript
import { renderHook } from '@testing-library/react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

// Mock useAuth
jest.mock('@/contexts/auth-context');

describe('useAuthGuard', () => {
  it('should redirect when not authenticated', () => {
    const mockPush = jest.fn();
    jest.mocked(useRouter).mockReturnValue({ push: mockPush });
    jest.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    
    renderHook(() => useAuthGuard());
    
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
```

## 迁移清单

- [ ] 创建 `useAuthGuard` 和 `useGuestGuard` Hook
- [ ] 创建 `LoadingSpinner` 组件
- [ ] 迁移所有使用 `withAuth` 的页面
- [ ] 迁移登录和注册页面
- [ ] 更新测试用例
- [ ] 删除不再使用的 `withAuth` HOC
- [ ] 更新文档和类型定义

## 总结

通过迁移到 Hook 方式，我们获得了：

1. **更清晰的代码结构**
2. **更好的类型安全性**
3. **更容易的测试和调试**
4. **更符合现代 React 最佳实践**
5. **更好的性能和可维护性**

这种方式更符合 Next.js 和现代 React 的开发理念，推荐在新项目中使用。