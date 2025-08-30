import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

// 需要认证的路径
const protectedPaths = [
  '/dashboard',
  '/profile',
  '/settings',
  '/exams',
  '/results',
  '/admin'
];

// 访客页面路径（已登录用户不应访问）
const guestPaths = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password'
];

// 公开路径（无需认证检查）
const publicPaths = [
  '/',
  '/about',
  '/contact',
  '/help'
];

/**
 * JWT Payload 接口
 */
interface JwtPayload {
  iat: number; // 签发时间
  exp: number; // 过期时间
  [key: string]: any;
}

/**
 * 检查用户是否已认证
 * 通过验证 accessToken JWT 的有效性和过期时间来判断
 * @param request - Next.js 请求对象
 * @returns 是否已认证
 */
function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get('accessToken')?.value;
  
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

/**
 * 检查路径是否匹配指定的路径列表
 */
function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some(path => {
    // 精确匹配
    if (pathname === path) return true;
    // 路径前缀匹配（如 /dashboard/settings 匹配 /dashboard）
    if (pathname.startsWith(path + '/')) return true;
    return false;
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = isAuthenticated(request);

  // 跳过 API 路由、静态文件和 Next.js 内部文件
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 检查是否为受保护路径
  const isProtectedPath = matchesPath(pathname, protectedPaths);
  
  // 检查是否为访客页面
  const isGuestPath = matchesPath(pathname, guestPaths);
  
  // 检查是否为公开页面
  const isPublicPath = matchesPath(pathname, publicPaths);

  // 未认证用户访问受保护页面 -> 重定向到登录页
  if (isProtectedPath && !authenticated) {
    console.log(`Middleware: Redirecting unauthenticated user from ${pathname} to /login`);
    const loginUrl = new URL('/login', request.url);
    // 保存原始路径，登录后可以重定向回来
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 已认证用户访问访客页面 -> 重定向到仪表板
  if (isGuestPath && authenticated) {
    console.log(`Middleware: Redirecting authenticated user from ${pathname} to /dashboard`);
    // 检查是否有重定向参数
    const redirectTo = request.nextUrl.searchParams.get('redirect');
    const targetUrl = redirectTo && matchesPath(redirectTo, protectedPaths) 
      ? redirectTo 
      : '/dashboard';
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 对于公开页面或其他路径，直接放行
  return NextResponse.next();
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