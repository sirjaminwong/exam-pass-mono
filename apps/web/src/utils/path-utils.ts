import type {
  PathConfig,
  PathMatchResult,
  RedirectOptions
} from '@/types/auth-types';
import {
  PathType
} from '@/types/auth-types';

/**
 * 默认的路径配置
 */
export const DEFAULT_PATH_CONFIGS: PathConfig[] = [
  {
    paths: [
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
      '/verify-email'
    ],
    type: PathType.PUBLIC
  },
  {
    paths: [
      '/dashboard',
      '/profile',
      '/settings'
    ],
    type: PathType.PROTECTED
  },
  {
    paths: [
      '/admin/*'
    ],
    type: PathType.PROTECTED // 管理员路径也是受保护的
  },
  {
    paths: [
      '/api/auth/*'
    ],
    type: PathType.API
  }
];

/**
 * 默认路径设置
 */
export const DEFAULT_PATHS = {
  loginPath: '/login',
  homePath: '/dashboard',
  unauthorizedPath: '/unauthorized'
};

/**
 * 检查路径是否匹配指定的模式
 * @param path - 要检查的路径
 * @param pattern - 匹配模式（支持通配符 *）
 * @returns 是否匹配
 */
export function matchPath(path: string, pattern: string): boolean {
  // 精确匹配
  if (path === pattern) {
    return true;
  }

  // 通配符匹配
  if (pattern.includes('*')) {
    const regexPattern = pattern
      .replace(/\*/g, '.*')
      .replace(/\//g, '\\/');
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }

  // 前缀匹配（以 / 结尾的模式）
  if (pattern.endsWith('/')) {
    return path.startsWith(pattern) || path.startsWith(pattern.slice(0, -1));
  }

  // 前缀匹配（路径以模式开头且下一个字符是 /）
  return path.startsWith(pattern + '/') || path === pattern;
}

/**
 * 检查路径是否匹配路径列表中的任一项
 * @param path - 要检查的路径
 * @param patterns - 路径模式列表
 * @returns 是否匹配
 */
export function matchAnyPath(path: string, patterns: string[]): boolean {
  return patterns.some(pattern => matchPath(path, pattern));
}

/**
 * 确定路径的类型
 * @param path - 要检查的路径
 * @param configs - 路径配置列表
 * @returns 路径匹配结果
 */
export function getPathType(path: string, configs: PathConfig[] = DEFAULT_PATH_CONFIGS): PathMatchResult {
  for (const config of configs) {
    if (matchAnyPath(path, config.paths)) {
      return {
        matches: true,
        type: config.type,
        matchedPath: path
      };
    }
  }

  // 默认为受保护路径
  return {
    matches: false,
    type: PathType.PROTECTED,
    matchedPath: path
  };
}

/**
 * 检查路径是否为公开路径
 * @param path - 要检查的路径
 * @param configs - 路径配置列表
 * @returns 是否为公开路径
 */
export function isPublicPath(path: string, configs: PathConfig[] = DEFAULT_PATH_CONFIGS): boolean {
  const result = getPathType(path, configs);
  return result.type === PathType.PUBLIC;
}

/**
 * 检查路径是否为受保护路径
 * @param path - 要检查的路径
 * @param configs - 路径配置列表
 * @returns 是否为受保护路径
 */
export function isProtectedPath(path: string, configs: PathConfig[] = DEFAULT_PATH_CONFIGS): boolean {
  const result = getPathType(path, configs);
  return result.type === PathType.PROTECTED;
}

/**
 * 检查路径是否为API路径
 * @param path - 要检查的路径
 * @param configs - 路径配置列表
 * @returns 是否为API路径
 */
export function isApiPath(path: string, configs: PathConfig[] = DEFAULT_PATH_CONFIGS): boolean {
  const result = getPathType(path, configs);
  return result.type === PathType.API;
}

/**
 * 检查路径是否需要认证
 * @param path - 要检查的路径
 * @param configs - 路径配置列表
 * @returns 是否需要认证
 */
export function requiresAuthentication(path: string, configs: PathConfig[] = DEFAULT_PATH_CONFIGS): boolean {
  const result = getPathType(path, configs);
  return result.type === PathType.PROTECTED;
}

/**
 * 构建重定向URL
 * @param targetPath - 目标路径
 * @param options - 重定向选项
 * @returns 完整的重定向URL
 */
export function buildRedirectUrl(targetPath: string, options: Partial<RedirectOptions> = {}): string {
  const {
    saveOriginalPath = false,
    searchParams = {}
  } = options;

  const url = new URL(targetPath, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  // 保存原始路径
  if (saveOriginalPath && typeof window !== 'undefined') {
    url.searchParams.set('returnUrl', window.location.pathname + window.location.search);
  }

  // 添加额外参数
  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.pathname + url.search;
}

/**
 * 构建登录重定向URL
 * @param currentPath - 当前路径
 * @param options - 重定向选项
 * @returns 登录重定向URL
 */
export function buildLoginRedirectUrl(
  currentPath: string,
  options: Partial<RedirectOptions> = {}
): string {
  return buildRedirectUrl(DEFAULT_PATHS.loginPath, {
    ...options,
    saveOriginalPath: true,
    searchParams: {
      ...options.searchParams,
      returnUrl: currentPath
    }
  });
}

/**
 * 构建未授权页面重定向URL
 * @param currentPath - 当前路径
 * @param options - 重定向选项
 * @returns 未授权页面重定向URL
 */
export function buildUnauthorizedRedirectUrl(
  currentPath: string,
  options: Partial<RedirectOptions> = {}
): string {
  return buildRedirectUrl(DEFAULT_PATHS.unauthorizedPath, {
    ...options,
    saveOriginalPath: true,
    searchParams: {
      ...options.searchParams,
      returnUrl: currentPath
    }
  });
}

/**
 * 从URL中提取返回路径
 * @param url - 包含returnUrl参数的URL
 * @param fallbackPath - 默认返回路径
 * @returns 返回路径
 */
export function extractReturnUrl(url: string, fallbackPath: string = '/'): string {
  try {
    const urlObj = new URL(url, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
    const returnUrl = urlObj.searchParams.get('returnUrl');
    
    if (returnUrl && returnUrl.startsWith('/')) {
      return returnUrl;
    }
    
    return fallbackPath;
  } catch (error) {
    console.warn('Failed to extract return URL:', error);
    return fallbackPath;
  }
}

/**
 * 规范化路径（移除重复的斜杠，确保以/开头）
 * @param path - 要规范化的路径
 * @returns 规范化后的路径
 */
export function normalizePath(path: string): string {
  if (!path) {
    return '/';
  }

  // 确保以 / 开头
  let normalized = path.startsWith('/') ? path : `/${path}`;
  
  // 移除重复的斜杠
  normalized = normalized.replace(/\/+/g, '/');
  
  // 移除末尾的斜杠（除非是根路径）
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

/**
 * 检查两个路径是否相等（规范化后比较）
 * @param path1 - 第一个路径
 * @param path2 - 第二个路径
 * @returns 是否相等
 */
export function pathsEqual(path1: string, path2: string): boolean {
  return normalizePath(path1) === normalizePath(path2);
}

/**
 * 获取路径的父级路径
 * @param path - 当前路径
 * @returns 父级路径
 */
export function getParentPath(path: string): string {
  const normalized = normalizePath(path);
  
  if (normalized === '/') {
    return '/';
  }

  const lastSlashIndex = normalized.lastIndexOf('/');
  
  if (lastSlashIndex === 0) {
    return '/';
  }

  return normalized.substring(0, lastSlashIndex);
}

/**
 * 检查路径是否为子路径
 * @param childPath - 子路径
 * @param parentPath - 父路径
 * @returns 是否为子路径
 */
export function isChildPath(childPath: string, parentPath: string): boolean {
  const normalizedChild = normalizePath(childPath);
  const normalizedParent = normalizePath(parentPath);

  if (normalizedParent === '/') {
    return normalizedChild !== '/';
  }

  return normalizedChild.startsWith(normalizedParent + '/') && normalizedChild !== normalizedParent;
}

/**
 * 合并路径配置
 * @param baseConfigs - 基础配置列表
 * @param additionalConfigs - 额外配置列表
 * @returns 合并后的配置列表
 */
export function mergePathConfigs(baseConfigs: PathConfig[], additionalConfigs: PathConfig[]): PathConfig[] {
  return [...baseConfigs, ...additionalConfigs];
}

/**
 * 根据类型查找路径配置
 * @param configs - 配置列表
 * @param type - 路径类型
 * @returns 匹配的配置
 */
export function findConfigByType(configs: PathConfig[], type: PathType): PathConfig | undefined {
  return configs.find(config => config.type === type);
}