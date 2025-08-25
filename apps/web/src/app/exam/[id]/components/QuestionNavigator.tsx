'use client';

import type { UserAnswer } from '@/types/exam';

interface QuestionNavigatorProps {
  examQuestions: any[]; // 考试题目列表
  currentQuestionIndex: number; // 当前题目索引
  answers: UserAnswer[]; // 用户答案
  onQuestionSelect: (index: number) => void; // 选择题目的回调
  className?: string; // 自定义样式类
}

export default function QuestionNavigator({
  examQuestions,
  currentQuestionIndex,
  answers,
  onQuestionSelect,
  className = ''
}: QuestionNavigatorProps) {
  const getQuestionStatus = (questionId: string, index: number) => {
    const hasAnswer = answers.some(a => a.questionId === questionId);
    const isCurrent = index === currentQuestionIndex;
    
    if (isCurrent) {
      return {
        className: 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105',
        label: '当前题目'
      };
    }
    
    if (hasAnswer) {
      return {
        className: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
        label: '已答题'
      };
    }
    
    return {
      className: 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200 hover:border-gray-400',
      label: '未答题'
    };
  };

  const getProgressStats = () => {
    const totalQuestions = examQuestions.length;
    const answeredQuestions = examQuestions.filter(q => 
      answers.some(a => a.questionId === q.questionId)
    ).length;
    const progressPercentage = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    
    return {
      total: totalQuestions,
      answered: answeredQuestions,
      remaining: totalQuestions - answeredQuestions,
      percentage: progressPercentage
    };
  };

  const stats = getProgressStats();

  return (
    <div className={`bg-white border-r shadow-sm h-full w-100 ${className}`}>
      {/* 进度统计 */}
      <div className="border-b bg-gray-50 px-3 py-2">
        <div className="mb-2">
          <h3 className="text-xs font-semibold text-gray-900 mb-1">答题进度</h3>
          <span className="text-xs text-gray-600">
            {stats.answered}/{stats.total} 题
          </span>
        </div>
        
        {/* 进度条 */}
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
          <div 
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${stats.percentage}%` }}
          />
        </div>
        
        {/* 统计信息 */}
        <div className="text-xs text-gray-600">
          <div>{Math.round(stats.percentage)}% 完成</div>
        </div>
      </div>

      {/* 题目导航网格 */}
      <div className="p-3 overflow-y-auto flex-1">
        <div className="grid grid-cols-10 gap-1">
          {examQuestions.map((examQuestion: any, index: number) => {
            const status = getQuestionStatus(examQuestion?.questionId, index);
            
            return (
              <button
                key={examQuestion?.id || index}
                onClick={() => onQuestionSelect(index)}
                className={`
                  relative w-8 h-8 rounded-md text-xs font-medium 
                  border transition-all duration-200 
                  focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${status.className}
                `}
                title={`第 ${index + 1} 题 - ${status.label}`}
              >
                {index + 1}
                
                {/* 当前题目指示器 */}
                {index === currentQuestionIndex && (
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-white" />
                )}
              </button>
            );
          })}
        </div>
        
        {/* 图例 */}
        <div className="mt-3 space-y-1 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded border" />
            <span>当前</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded" />
            <span>已答</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded" />
            <span>未答</span>
          </div>
        </div>
        
        {/* 快速跳转提示 */}
        {stats.remaining > 0 && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-center">
            <p className="text-xs text-yellow-800">
              还有 {stats.remaining} 题未答
            </p>
          </div>
        )}
      </div>
    </div>
  );
}