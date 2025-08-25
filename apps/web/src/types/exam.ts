import type { ExamDto } from '@/models/examDto';
import type { QuestionDto } from '@/models/questionDto';
import type { QuestionDtoType } from '@/models/questionDtoType';

// 考试题目关联接口（基于后端 Prisma 模型）
export interface ExamQuestion {
  id: string;
  examId: string;
  questionId: string;
  question: {
    id: string;
    type: QuestionDtoType;
    content: string;
    options: []; // 选项数组
    correctAnswer: unknown; // JSON 类型
    explanation: string | null;
    score: number;
  };
}

// 考试详情接口（包含题目）
export interface ExamDetail extends ExamDto {
  questions: ExamQuestion[];
  totalScore: number;
  questionCount: number;
  duration?: number; // 考试时长（分钟）
  passingScore?: number; // 及格分数
}

// 考试记录接口
export interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  startedAt: string;
  completedAt?: string;
  totalScore?: number;
  maxScore?: number;
  accuracy?: number;
  isCompleted: boolean;
  timeSpent?: number; // 用时（秒）
}

// 答案接口
export interface Answer {
  id?: string;
  attemptId: string;
  questionId: string;
  userAnswer: string;
  isCorrect?: boolean;
  score?: number;
  answeredAt?: string;
}

// 用户答案（前端状态）
export interface UserAnswer {
  questionId: string;
  selectedOption: string;
  isCorrect?: boolean;
}

// 题目选项类型
export type QuestionOptions = string[];

// 正确答案类型（根据题目类型不同）
export type CorrectAnswer = string | string[] | boolean;

// 考试状态
export enum ExamStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED'
}

// 用户信息（简化版）
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export { QuestionDtoType };