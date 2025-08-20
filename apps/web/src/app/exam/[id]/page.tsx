'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useExamsControllerFindOne } from '../../../services/exams/exams';
import { useExamQuestionsControllerFindByExam } from '../../../services/exam-questions/exam-questions';
import { 
  useExamAttemptsControllerStartExam,
  useExamAttemptsControllerCompleteAttempt
} from '../../../services/exam-attempts/exam-attempts';
import { useAnswersControllerSubmitAnswer } from '../../../services/answers/answers';
import type { UserAnswer, User } from '../../../types/exam';

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.id as string;
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [attemptId, setAttemptId] = useState<string>('');

  // 获取考试信息
  const { data: exam, isLoading: examLoading, error: examError } = useExamsControllerFindOne(examId);
  console.log('exam', exam);

  // 获取考试题目
  const { data: examQuestions, isLoading: questionsLoading, error: questionsError } = useExamQuestionsControllerFindByExam(examId);


    console.log('examQuestions', examQuestions);



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

  // 计时器
  useEffect(() => {
    if (!examStarted || examCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleCompleteExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examCompleted, timeRemaining]);

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
          setTimeRemaining((exam as any)?.duration * 60 || 3600); // 转换为秒
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
    <div className="min-h-screen bg-gray-50">
      {/* 顶部状态栏 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{(exam as any)?.title}</h1>
            <p className="text-sm text-gray-600">
              第 {currentQuestionIndex + 1} 题 / 共 {examQuestions?.length || 0} 题
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono font-semibold text-red-600">
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-gray-600">剩余时间</p>
          </div>
        </div>
      </div>

      {/* 题目内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentQuestion?.question?.content}
              </h2>
              
              {/* <div className="space-y-3">
                {currentQuestion?.question?.options && typeof currentQuestion.question.options === 'object' ? Object.values(currentQuestion.question.options).map((option: any, index: number) => {
                  const optionKey = String.fromCharCode(65 + index); // A, B, C, D
                  const isSelected = currentAnswer?.selectedOption === optionKey;
                  
                  return (
                    <label
                      key={index}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion?.questionId}`}
                        value={optionKey}
                        checked={isSelected}
                        onChange={() => handleAnswerSelect(currentQuestion?.questionId || '', optionKey)}
                        className="mr-3 text-blue-600"
                      />
                      <span className="font-medium text-gray-700 mr-2">{optionKey}.</span>
                      <span className="text-gray-900">{option}</span>
                    </label>
                  );
                }) : null}
              </div> */}
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between items-center pt-6 border-t">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一题
              </button>
              
              <div className="flex space-x-3">
                {currentQuestionIndex === (examQuestions?.length || 0) - 1 ? (
                  <button
                    onClick={handleCompleteExam}
                    disabled={completeAttemptMutation.isPending}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {completeAttemptMutation.isPending ? '提交中...' : '提交考试'}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    下一题
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 题目导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {examQuestions?.map((examQuestion: any, index: number) => {
              const hasAnswer = answers.some(a => a.questionId === examQuestion?.questionId);
              const isCurrent = index === currentQuestionIndex;
              
              return (
                <button
                  key={examQuestion?.id}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : hasAnswer
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}