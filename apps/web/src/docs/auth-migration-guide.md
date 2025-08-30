# 认证保护迁移指南

本指南展示认证保护的演进过程：从高阶组件 (HOC) → React Hook → Next.js Middleware。

## 当前实现：Next.js Middleware

我们已经迁移到使用 Next.js Middleware 进行认证保护，这是最优的解决方案：

### Middleware 的优势

1. **服务端执行**: 在服务端进行认证检查，避免客户端闪烁
2. **性能优化**: 减少不必要的页面渲染和重定向
3. **SEO 友好**: 搜索引擎不会索引到未认证的内容
4. **统一管理**: 所有路由保护逻辑集中在一个地方
5. **更好的用户体验**: 无缝的重定向体验

### 简化的 Hook

现在的 `useAuthGuard` 和 `useGuestGuard` hooks 仅用于：

1. **状态检查**: 提供认证状态信息
2. **内容控制**: 决定是否显示页面内容
3. **加载状态**: 处理认证状态加载中的 UI

## 历史演进

### 第一阶段：高阶组件的问题

1. **复杂性**: HOC 增加了组件层级，使调试变得困难
2. **类型推断**: TypeScript 中 HOC 的类型推断较为复杂
3. **可读性**: 代码意图不够直观
4. **灵活性**: 难以自定义认证逻辑
5. **现代性**: 不符合现代 React 的 Hook 优先理念

### 第二阶段：Hook 方式的改进

1. **简洁性**: 代码更简洁，逻辑更清晰
2. **类型安全**: 更好的 TypeScript 支持
3. **可组合性**: 可以轻松组合多个 Hook
4. **可测试性**: 更容易进行单元测试
5. **性能**: 避免不必要的组件包装

### 第三阶段：Middleware 的最终解决方案

1. **无闪烁**: 服务端重定向，用户体验更好
2. **更高性能**: 避免客户端 JavaScript 执行
3. **更好的 SEO**: 搜索引擎友好
4. **统一管理**: 集中的路由保护逻辑
5. **安全性**: 验证 JWT token 的有效性和过期时间，而不仅仅检查存在性

## 当前实现代码

### 1. Next.js Middleware 实现

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// 定义路径配置
const protectedPaths = ["/dashboard", "/exam", "/profile"];
const guestPaths = ["/login", "/register"];
const publicPaths = ["/", "/about", "/contact"];

// JWT Payload 接口
interface JwtPayload {
  iat: number; // 签发时间
  exp: number; // 过期时间
  [key: string]: any;
}

// 检查用户是否已认证
function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  try {
    // 解码 JWT token
    const decoded = jwtDecode<JwtPayload>(accessToken);

    // 检查 token 是否过期
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return false;
    }

    return true;
  } catch (error) {
    // token 格式无效或解码失败
    return false;
  }
}

// 检查路径是否匹配
function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some((path) => pathname.startsWith(path));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userIsAuthenticated = isAuthenticated(request);

  // 受保护的路径：未认证用户重定向到登录页
  if (matchesPath(pathname, protectedPaths) && !userIsAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 访客页面：已认证用户重定向到仪表板
  if (matchesPath(pathname, guestPaths) && userIsAuthenticated) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### 2. 认证安全性改进

#### JWT Token 验证

新的 `isAuthenticated` 函数不再仅仅检查 `accessToken` cookie 的存在性，而是进行了更严谨的验证：

1. **Token 存在性检查**: 首先检查 `accessToken` cookie 是否存在
2. **Token 格式验证**: 使用 `jwt-decode` 库解码 JWT token，验证其格式是否正确
3. **过期时间验证**: 检查 token 的 `exp`（过期时间）字段，确保 token 未过期
4. **错误处理**: 捕获解码过程中的任何错误，如格式无效、签名错误等

#### 安全优势

- **防止伪造 Token**: 无效的 JWT 格式会被拒绝
- **自动过期处理**: 过期的 token 会被自动识别并拒绝
- **容错性**: 任何解码错误都会导致认证失败，确保安全性
- **性能优化**: 在服务端进行验证，避免客户端的安全风险

#### 依赖要求

```bash
# 安装 JWT 解码库
pnpm add jwt-decode
```

#### 关于服务端 Token 验证的考虑

当前的 middleware 实现只在客户端验证 JWT token 的格式和过期时间，而没有调用后端接口来验证 token 是否真的有效（比如是否被撤销、用户是否被禁用等）。

**为什么不在 Middleware 中调用接口验证：**

1. **性能考虑**：Middleware 在每个请求上都会执行，调用接口会增加延迟，影响用户体验
2. **架构复杂性**：Next.js Middleware 运行在 Edge Runtime 环境，需要处理网络请求失败的情况
3. **缓存问题**：频繁的验证请求需要合理的缓存策略，增加系统复杂性

**推荐的解决方案：**

- **一般页面**：使用当前的 Middleware 实现（性能优先）
- **敏感页面**：在组件中添加服务端验证
- **关键操作**：在具体的 API 调用中进行验证

**混合验证策略示例：**

```typescript
// 只对关键路径进行服务端验证
const CRITICAL_PATHS = ['/admin', '/payment', '/sensitive-data'];

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;
  
  if (!accessToken) {
    return false;
  }
  
  try {
    // 1. 本地 JWT 验证
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp && decoded.exp < currentTime) {
      return false;
    }
    
    // 2. 只对关键路径进行服务端验证
    const isCriticalPath = CRITICAL_PATHS.some(path => pathname.startsWith(path));
    if (isCriticalPath) {
      return await validateTokenWithAPI(accessToken);
    }
    
    return true;
    
  } catch (error) {
    return false;
  }
}
```

**组件级别的服务端验证：**

```typescript
// src/hooks/useAuthGuard.ts
export function useAuthGuard(requireServerValidation = false) {
  const { isAuthenticated, isLoading } = useAuth();
  const [isServerValidated, setIsServerValidated] = useState(!requireServerValidation);
  
  useEffect(() => {
    if (requireServerValidation && isAuthenticated && !isLoading) {
      // 在组件级别进行服务端验证
      validateTokenWithServer().then(setIsServerValidated);
    }
  }, [isAuthenticated, isLoading, requireServerValidation]);
  
  return {
    isAuthenticated: isAuthenticated && isServerValidated,
    isLoading: isLoading || (requireServerValidation && !isServerValidated),
    shouldShowContent: isAuthenticated && isServerValidated && !isLoading,
  };
}
```

这样既保证了性能，又在需要的地方提供了额外的安全保障。

### 3. 简化的认证 Hooks

```typescript
// src/hooks/useAuthGuard.ts
import { useAuth } from "@/contexts/auth-context";

/**
 * 认证守卫 Hook
 * 仅用于状态检查和内容控制，重定向由 Middleware 处理
 */
export function useAuthGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    shouldShowContent: isAuthenticated && !isLoading,
  };
}

/**
 * 访客守卫 Hook
 * 仅用于状态检查和内容控制，重定向由 Middleware 处理
 */
export function useGuestGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  return {
    isAuthenticated,
    isLoading,
    shouldShowContent: !isAuthenticated && !isLoading,
  };
}
```

## 历史实现（仅供参考）

### 旧版认证 Hook（已废弃）

```typescript
// src/hooks/useAuthGuard.ts
// ⚠️ 已废弃：这是迁移前的实现，仅作参考
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

/**
 * 认证守卫 Hook（旧版本）
 * 用于保护需要登录的页面
 */
export function useAuthGuard(redirectTo: string = "/login") {
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
 * 反向认证守卫 Hook（旧版本）
 * 用于保护不需要登录的页面（如登录页、注册页）
 */
export function useGuestGuard(redirectTo: string = "/dashboard") {
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
import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingSpinner({
  text = "加载中...",
  fullScreen = true,
  className = "",
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
import { withAuth } from "@/contexts/auth-context";

function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <div>{/* 页面内容 */}</div>;
}

// 使用 HOC 包装
export default withAuth(DashboardPage);
```

#### 迁移后 (Hook 方式)

```typescript
// 新的方式
import { useAuth } from "@/contexts/auth-context";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

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

  return <div>{/* 页面内容 */}</div>;
}

// 直接导出，无需 HOC
export default DashboardPage;
```

### 4. 迁移访客页面（登录/注册）

#### 迁移前

```typescript
// 旧的方式
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return <div>加载中...</div>;
  }

  return <div>{/* 登录表单 */}</div>;
}

export default LoginPage;
```

#### 迁移后

```typescript
// 新的方式
import { useGuestGuard } from "@/hooks/useAuthGuard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function LoginPage() {
  const { shouldShowContent } = useGuestGuard();

  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }

  return <div>{/* 登录表单 */}</div>;
}

export default LoginPage;
```

## 高级用法

### 使用认证守卫

```typescript
function AdminPage() {
  const { shouldShowContent } = useAuthGuard();

  if (!shouldShowContent) {
    return <LoadingSpinner />;
  }

  // 页面内容
}
```

注意：现在所有的重定向逻辑都由 Next.js Middleware 处理，hooks 不再接受重定向参数。

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

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (shouldShowContent && !isAdmin) {
      router.push("/unauthorized");
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
import { renderHook } from "@testing-library/react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

// Mock useAuth
jest.mock("@/contexts/auth-context");

describe("useAuthGuard", () => {
  it("should redirect when not authenticated", () => {
    const mockPush = jest.fn();
    jest.mocked(useRouter).mockReturnValue({ push: mockPush });
    jest.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });

    renderHook(() => useAuthGuard());

    expect(mockPush).toHaveBeenCalledWith("/login");
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
