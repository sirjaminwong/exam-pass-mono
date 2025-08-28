import React from 'react';

interface LoadingSpinnerProps {
  /** 加载文本，默认为 "加载中..." */
  text?: string;
  /** 是否显示为全屏加载，默认为 true */
  fullScreen?: boolean;
  /** 自定义类名 */
  className?: string;
}

/**
 * 通用加载组件
 * 用于显示加载状态，支持全屏和内联两种模式
 */
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

/**
 * 小尺寸加载组件
 * 用于按钮或小区域的加载状态
 */
export function LoadingSpinnerSmall({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-current ${className}`}></div>
  );
}