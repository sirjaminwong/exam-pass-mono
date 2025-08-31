import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { PathConfig } from '@/types/auth-types';
import { PathType } from '@/types/auth-types';
import {
  validateJwtToken,
  getTokenRemainingTime
} from '@/utils/auth-utils';
import {
  DEFAULT_PATH_CONFIGS,
  DEFAULT_PATHS,
  getPathType,
  requiresAuthentication,
  buildLoginRedirectUrl,
  extractReturnUrl,
  normalizePath
} from '@/utils/path-utils';

// 扩展默认路径配置
const MIDDLEWARE_PATH_CONFIGS: PathConfig[] = [
  ...DEFAULT_PATH_CONFIGS,
  {
    paths: [
      '/exams',
      '/results'
    ],
    type: PathType.PROTECTED
  },
  {
    paths: [
      '/',
      '/about',
      '/contact',
      '/help'
    ],
    type: PathType.PUBLIC
  },
  {
    paths: [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password'
    ],
    type: PathType.GUEST
  }
];

/**
 * 检查用户是否已认证
 * 通过验证 accessToken JWT 的有效性和过期时间来判断
 * @param request - Next.js 请求对象
 * @returns 认证结果对象
 */
function checkAuthentication(request: NextRequest): {
  isAuthenticated: boolean;
  tokenValid: boolean;
  remainingTime: number;
  shouldRefresh: boolean;
} {
  const accessToken = request.cookies.get('accessToken')?.value;
  
  if (!accessToken) {
    return {
      isAuthenticated: false,
      tokenValid: false,
      remainingTime: 0,
      shouldRefresh: false
    };
  }
  
  const validation = validateJwtToken(accessToken);
  const remainingTime = getTokenRemainingTime(accessToken);

  console.log('Middleware: Token validation result', {
    isValid: validation.isValid,
    remainingTime,
    shouldRefresh: remainingTime > 0 && remainingTime <= 300 // 5分钟内需要刷新
  });
  
  return {
    isAuthenticated: validation.isValid,
    tokenValid: validation.isValid,
    remainingTime,
    shouldRefresh: remainingTime > 0 && remainingTime <= 300 // 5分钟内需要刷新
  };
}

/**
 * 检查路径是否应该跳过中间件处理
 * @param pathname - 路径名
 * @returns 是否跳过
 */
function shouldSkipMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  );
}

/**
 * 处理未认证用户访问受保护路径
 * @param request - Next.js 请求对象
 * @param pathname - 当前路径
 * @returns 重定向响应
 */
function handleUnauthenticatedAccess(request: NextRequest, pathname: string): NextResponse {
  console.log(`Middleware: Redirecting unauthenticated user from ${pathname} to ${DEFAULT_PATHS.loginPath}`);
  
  const loginUrl = buildLoginRedirectUrl(pathname, {
    searchParams: {
      reason: 'authentication_required'
    }
  });
  
  return NextResponse.redirect(new URL(loginUrl, request.url));
}

/**
 * 处理已认证用户访问访客页面
 * @param request - Next.js 请求对象
 * @param pathname - 当前路径
 * @returns 重定向响应
 */
function handleAuthenticatedGuestAccess(request: NextRequest, pathname: string): NextResponse {
  console.log(`Middleware: Redirecting authenticated user from ${pathname} to ${DEFAULT_PATHS.homePath}`);
  
  // 检查是否有重定向参数
  const redirectTo = extractReturnUrl(request.url, DEFAULT_PATHS.homePath);
  const normalizedRedirect = normalizePath(redirectTo);
  
  // 验证重定向目标是否为受保护路径
  const targetUrl = requiresAuthentication(normalizedRedirect, MIDDLEWARE_PATH_CONFIGS)
    ? normalizedRedirect
    : DEFAULT_PATHS.homePath;
    
  return NextResponse.redirect(new URL(targetUrl, request.url));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPath = normalizePath(pathname);

  // 跳过不需要处理的路径
  if (shouldSkipMiddleware(normalizedPath)) {
    return NextResponse.next();
  }

  // 检查认证状态
  const authResult = checkAuthentication(request);
  
  // 获取路径类型
  const pathResult = getPathType(normalizedPath, MIDDLEWARE_PATH_CONFIGS);
  
  // 记录调试信息
  console.log(`Middleware: Processing ${normalizedPath}, type: ${pathResult.type}, authenticated: ${authResult.isAuthenticated}`);

  // 处理不同路径类型的访问控制
  switch (pathResult.type) {
    case PathType.PROTECTED:
      // 受保护路径需要认证
      if (!authResult.isAuthenticated) {
        return handleUnauthenticatedAccess(request, normalizedPath);
      }
      
      // 如果token即将过期，添加刷新提示头
      if (authResult.shouldRefresh) {
        const response = NextResponse.next();
        response.headers.set('X-Token-Refresh-Needed', 'true');
        response.headers.set('X-Token-Remaining-Time', authResult.remainingTime.toString());
        return response;
      }
      break;
      
    case PathType.GUEST:
      // 访客页面，已认证用户应重定向
      if (authResult.isAuthenticated) {
        return handleAuthenticatedGuestAccess(request, normalizedPath);
      }
      break;
      
    case PathType.PUBLIC:
    case PathType.API:
    case PathType.STATIC:
    default:
      // 公开路径、API路径和静态资源直接放行
      break;
  }

  // 添加路径信息到响应头，供客户端使用
  const response = NextResponse.next();
  response.headers.set('X-Path-Type', pathResult.type || PathType.PUBLIC);
  response.headers.set('X-Auth-Status', authResult.isAuthenticated ? 'authenticated' : 'unauthenticated');
  
  return response;
}

// 配置 middleware 匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - api 路由 (以 /api/ 开头)
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (网站图标)
     * - 其他静态资源文件
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};