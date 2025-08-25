'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useExamsControllerFindOne } from '@/services/exams/exams';
import { useExamQuestionsControllerFindByExam } from '@/services/exam-questions/exam-questions';
import { 
  useExamAttemptsControllerStartExam,
  useExamAttemptsControllerCompleteAttempt
} from '@/services/exam-attempts/exam-attempts';
import { useAnswersControllerSubmitAnswer } from '@/services/answers/answers';
import type { UserAnswer, User } from '@/types/exam';
import Timer from './components/Timer';
import QuestionNavigator from './components/QuestionNavigator';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [attemptId, setAttemptId] = useState<string>('');

  // 获取考试信息
  const { data: exam, isLoading: examLoading, error: examError } = useExamsControllerFindOne(examId);

  // 获取考试题目
  const { data: examQuestions, isLoading: questionsLoading, error: questionsError } = useExamQuestionsControllerFindByExam(examId);

  // API hooks
  const startExamMutation = useExamAttemptsControllerStartExam();
  const completeAttemptMutation = useExamAttemptsControllerCompleteAttempt();
  const submitAnswerMutation = useAnswersControllerSubmitAnswer();

  // 检查用户登录状态
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    const userData = JSON.parse(user);
    setCurrentUser({
      ...userData,
      role: userData.role || 'student'
    });
  }, [router]);



  const handleStartExam = async () => {
    if (!currentUser || !exam) return;

    try {
      const result = await startExamMutation.mutateAsync({
        data: {
          userId: currentUser.id,
          examId: examId
        }
      });
       
       if (result) {
          setAttemptId((result as any).id);
          setExamStarted(true);
          setInitialTime((exam as any)?.duration * 60 || 3600); // 转换为秒
        }
    } catch (error) {
      console.error('开始考试失败:', error);
    }
  };

  const handleAnswerSelect = (questionId: string, selectedOption: string) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      const newAnswer: UserAnswer = { questionId, selectedOption };
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newAnswer;
        return updated;
      } else {
        return [...prev, newAnswer];
      }
    });
  };

  const handleNextQuestion = () => {
    if (examQuestions && currentQuestionIndex < (examQuestions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleCompleteExam = async () => {
    if (!attemptId) return;

    try {
      // 提交所有答案
      for (const answer of answers) {
        await submitAnswerMutation.mutateAsync({
          data: {
            attemptId: attemptId,
            questionId: answer.questionId,
            userAnswer: answer.selectedOption
          }
        });
      }

      // 完成考试
      await completeAttemptMutation.mutateAsync({ id: attemptId });

      setExamCompleted(true);
    } catch (error) {
      console.error('提交考试失败:', error);
    }
  };



  if (examLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载考试中...</div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">考试不存在</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            返回主页
          </Link>
        </div>
      </div>
    );
  }

  if (examCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">考试完成！</h1>
          <p className="text-gray-600 mb-6">
            您已成功完成《{(exam as any)?.title}》考试
          </p>
          <div className="space-y-3">
            <Link 
              href="/dashboard" 
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              查看成绩
            </Link>
            <Link 
              href="/dashboard" 
              className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              返回主页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{(exam as any)?.title}</h1>
            <p className="text-gray-600 mb-6">{(exam as any)?.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">考试信息</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>题目数量: {examQuestions?.length || 0} 题</li>
                <li>考试时长: {(exam as any)?.duration} 分钟</li>
                <li>及格分数: {(exam as any)?.passingScore} 分</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">考试须知</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>• 考试开始后不可暂停</li>
                <li>• 请在规定时间内完成</li>
                <li>• 每题只能选择一个答案</li>
                <li>• 提交后不可修改</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleStartExam}
              disabled={startExamMutation.isPending}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {startExamMutation.isPending ? '准备中...' : '开始考试'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = examQuestions?.[currentQuestionIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.questionId);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 左侧题目导航器 */}
      <div className="w-64 flex-shrink-0">
        <QuestionNavigator
          examQuestions={examQuestions || []}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onQuestionSelect={setCurrentQuestionIndex}
          className="fixed left-0 top-0 bottom-0 w-64"
        />
      </div>

      {/* 右侧主要内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部状态栏 */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{(exam as any)?.title}</h1>
              <p className="text-sm text-gray-600">
                第 {currentQuestionIndex + 1} 题 / 共 {examQuestions?.length || 0} 题
              </p>
            </div>
            <div className="w-48">
              <Timer 
                initialTime={initialTime}
                onTimeUp={handleCompleteExam}
                isActive={examStarted && !examCompleted}
              />
            </div>
          </div>
        </div>

        {/* 题目内容 */}
        <div className="flex-1 px-6 py-8 overflow-y-auto">
          {currentQuestion && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-6">
                  {/* 题目标题增强 */}
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 leading-relaxed flex-1">
                      {currentQuestion?.question?.content}
                    </h2>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        第 {currentQuestionIndex + 1} 题
                      </span>
                    </div>
                  </div>
                  
                  {/* 选项列表优化 */}
                  <div className="space-y-4">
                    {currentQuestion?.question?.options && Array.isArray(currentQuestion.question.options) ? currentQuestion.question.options.map((option, index: number) => {
                      const optionKey = option.key;
                      const isSelected = currentAnswer?.selectedOption === optionKey;
                      
                      return (
                        <label
                          key={index}
                          className={`group flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' 
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:shadow-sm'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion?.questionId}`}
                            value={optionKey}
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(currentQuestion?.questionId || '', optionKey)}
                            className="mt-1 mr-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 ${
                                isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
                              }`}>
                                {optionKey}
                              </span>
                              <span className="text-gray-900 text-lg leading-relaxed">{option.text}</span>
                            </div>
                          </div>
                        </label>
                      );
                    }) : null}
                  </div>
                </div>

                {/* 导航按钮优化 */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    上一题
                  </button>
                  
                  <div className="flex space-x-4">
                    {currentQuestionIndex === (examQuestions?.length || 0) - 1 ? (
                      <button
                        onClick={handleCompleteExam}
                        disabled={completeAttemptMutation.isPending}
                        className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        {completeAttemptMutation.isPending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            提交中...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            提交考试
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        下一题
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}