'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  useExamAttemptsControllerFindByUser,
  useExamAttemptsControllerGetUserStats
} from '../../services/exam-attempts/exam-attempts';
import { useExamsControllerFindAll } from '../../services/exams/exams';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 获取用户考试记录
  const { data: userAttempts, isLoading: attemptsLoading } = useExamAttemptsControllerFindByUser(
    currentUser?.id || ''
  );

  // 获取用户统计信息
  const { data: userStats, isLoading: statsLoading } = useExamAttemptsControllerGetUserStats(
    currentUser?.id || ''
  );

  // 获取所有可用考试
  const { data: availableExams, isLoading: examsLoading } = useExamsControllerFindAll();

  useEffect(() => {
    // 检查用户登录状态
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/login');
      return;
    }
    
    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } catch (error) {
      console.error('解析用户数据失败:', error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN');
  };

  const getScoreColor = (score: number, passingScore: number) => {
    if (score >= passingScore) {
      return 'text-green-600';
    }
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">已完成</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">进行中</span>;
      case 'abandoned':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">已放弃</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">考试系统</h1>
            <p className="text-sm text-gray-600">欢迎回来，{currentUser.username}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              首页
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总考试次数</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statsLoading ? '-' : (userStats as any)?.totalAttempts || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">通过次数</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statsLoading ? '-' : (userStats as any)?.passedAttempts || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">平均分数</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statsLoading ? '-' : Math.round((userStats as any)?.averageScore || 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">通过率</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {statsLoading ? '-' : Math.round(((userStats as any)?.passRate || 0) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 可用考试 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">可用考试</h2>
            </div>
            <div className="p-6">
              {examsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">加载中...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(availableExams as any)?.slice(0, 5).map((exam: any) => (
                    <div key={exam.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-medium text-gray-900">{exam.title}</h3>
                        <p className="text-sm text-gray-600">{exam.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>题目: {exam.questions?.length || 0}</span>
                          <span>时长: {exam.duration} 分钟</span>
                          <span>及格: {exam.passingScore} 分</span>
                        </div>
                      </div>
                      <Link
                        href={`/exam/${exam.id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        开始考试
                      </Link>
                    </div>
                  ))}
                  {(!availableExams || (availableExams as any)?.length === 0) && (
                    <p className="text-center text-gray-500 py-8">暂无可用考试</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 考试记录 */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">最近考试记录</h2>
            </div>
            <div className="p-6">
              {attemptsLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">加载中...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(userAttempts as any)?.slice(0, 5).map((attempt: any) => (
                    <div key={attempt.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{attempt.exam?.title}</h3>
                        {getStatusBadge(attempt.status)}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>考试时间: {formatDate(attempt.startedAt)}</span>
                        {attempt.score !== null && (
                          <span className={getScoreColor(attempt.score, attempt.exam?.passingScore || 60)}>
                            得分: {attempt.score}/{attempt.exam?.totalScore || 100}
                          </span>
                        )}
                      </div>
                      {attempt.completedAt && (
                        <p className="text-xs text-gray-500 mt-1">
                          完成时间: {formatDate(attempt.completedAt)}
                        </p>
                      )}
                    </div>
                  ))}
                  {(!userAttempts || (userAttempts as any)?.length === 0) && (
                    <p className="text-center text-gray-500 py-8">暂无考试记录</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}