'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // 初始时间（秒）
  onTimeUp: () => void; // 时间到时的回调
  isActive: boolean; // 是否激活计时器
}

export default function Timer({ initialTime, onTimeUp, isActive }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-red-600'; // 最后5分钟红色
    if (timeRemaining <= 600) return 'text-orange-600'; // 最后10分钟橙色
    return 'text-gray-900'; // 正常时间黑色
  };

  const getBackgroundColor = () => {
    if (timeRemaining <= 300) return 'bg-red-50 border-red-200'; // 最后5分钟红色背景
    if (timeRemaining <= 600) return 'bg-orange-50 border-orange-200'; // 最后10分钟橙色背景
    return 'bg-white border-gray-200'; // 正常背景
  };

  return (
    <div className={`rounded-lg border p-3 transition-all duration-300 ${getBackgroundColor()}`}>
      <div className="text-center">
        <div className={`text-lg font-mono font-bold transition-colors duration-300 ${getTimeColor()}`}>
          {formatTime(timeRemaining)}
        </div>
        <p className="text-xs text-gray-600 mt-1">剩余时间</p>
        
        {/* 进度条 */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className={`h-1.5 rounded-full transition-all duration-1000 ${
              timeRemaining <= 300 
                ? 'bg-red-500' 
                : timeRemaining <= 600 
                ? 'bg-orange-500' 
                : 'bg-blue-500'
            }`}
            style={{ 
              width: `${(timeRemaining / initialTime) * 100}%` 
            }}
          />
        </div>
        
        {/* 时间警告 */}
        {timeRemaining <= 300 && timeRemaining > 0 && (
          <div className="mt-1 text-xs text-red-600 font-medium animate-pulse">
            ⚠️ 时间不足！
          </div>
        )}
      </div>
    </div>
  );
}