import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  scoreNumber,
  PaginationSchema,
  SortSchema,
  SearchSchema,
} from '../../common/utils/zod';

// ============= ExamAttempt Schemas =============

/**
 * 创建考试记录 Schema
 */
export const CreateExamAttemptSchema = z.object({
  userId: cuidString().describe('用户ID'),
  examId: cuidString().describe('试卷ID'),
  startTime: dateString()
    .optional()
    .describe('开始时间（可选，默认为当前时间）'),
});

/**
 * 开始考试 Schema
 */
export const StartExamSchema = z.object({
  userId: cuidString().describe('用户ID'),
  examId: cuidString().describe('试卷ID'),
});

/**
 * 更新考试记录 Schema
 */
export const UpdateExamAttemptSchema = z.object({
  endTime: dateString().optional().describe('结束时间'),
  score: scoreNumber().optional().describe('得分'),
  isCompleted: z.boolean().optional().describe('是否完成'),
});

/**
 * 完成考试 Schema
 */
export const CompleteExamAttemptSchema = z.object({
  score: scoreNumber().optional().describe('最终得分（可选，系统可自动计算）'),
});

/**
 * 考试记录响应 Schema
 */
export const ExamAttemptSchema = z.object({
  id: cuidString().describe('考试记录ID'),
  userId: cuidString().describe('用户ID'),
  examId: cuidString().describe('试卷ID'),
  startTime: dateString().describe('开始时间'),
  endTime: dateString().optional().describe('结束时间'),
  score: z.number().optional().describe('得分'),
  isCompleted: z.boolean().describe('是否完成'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
  // 关联数据
  user: z
    .object({
      id: cuidString(),
      name: z.string(),
      email: z.string(),
    })
    .optional()
    .describe('用户信息'),
  exam: z
    .object({
      id: cuidString(),
      title: z.string(),
      description: z.string().optional(),
    })
    .optional()
    .describe('试卷信息'),
  answers: z
    .array(
      z.object({
        id: cuidString(),
        questionId: cuidString(),
        userAnswer: z.any(),
        isCorrect: z.boolean().optional(),
        score: z.number().optional(),
        question: z
          .object({
            id: cuidString(),
            type: z.string(),
            content: z.string(),
            score: z.number(),
          })
          .optional(),
      }),
    )
    .optional()
    .describe('答题记录'),
});

/**
 * 考试记录查询 Schema
 */
export const QueryExamAttemptSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      userId: cuidString().optional().describe('按用户ID筛选'),
      examId: cuidString().optional().describe('按试卷ID筛选'),
      isCompleted: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return undefined;
          return val === 'true';
        })
        .pipe(z.boolean().optional())
        .describe('按完成状态筛选'),
      startTimeFrom: dateString().optional().describe('开始时间范围-起始'),
      startTimeTo: dateString().optional().describe('开始时间范围-结束'),
      minScore: z
        .string()
        .optional()
        .transform((val) => (val ? parseFloat(val) : undefined))
        .pipe(z.number().min(0).optional())
        .describe('最小分数'),
      maxScore: z
        .string()
        .optional()
        .transform((val) => (val ? parseFloat(val) : undefined))
        .pipe(z.number().min(0).optional())
        .describe('最大分数'),
    }),
  );

/**
 * 考试记录统计 Schema
 */
export const ExamAttemptStatsSchema = z.object({
  totalAttempts: z.number().describe('总考试次数'),
  completedAttempts: z.number().describe('已完成考试次数'),
  averageScore: z.number().optional().describe('平均分数'),
  highestScore: z.number().optional().describe('最高分数'),
  lowestScore: z.number().optional().describe('最低分数'),
  totalTimeSpent: z.number().optional().describe('总用时（分钟）'),
  averageTimeSpent: z.number().optional().describe('平均用时（分钟）'),
  passRate: z.number().optional().describe('通过率'),
});

/**
 * 用户考试统计 Schema
 */
export const UserExamStatsSchema = z.object({
  userId: cuidString().describe('用户ID'),
  totalExams: z.number().describe('参与考试总数'),
  completedExams: z.number().describe('完成考试数'),
  averageScore: z.number().optional().describe('平均分数'),
  bestScore: z.number().optional().describe('最佳分数'),
  totalStudyTime: z.number().optional().describe('总学习时间（分钟）'),
  recentAttempts: z
    .array(ExamAttemptSchema)
    .optional()
    .describe('最近考试记录'),
});

/**
 * 考试详细统计 Schema
 */
export const ExamDetailStatsSchema = z.object({
  attemptId: cuidString().describe('考试记录ID'),
  totalQuestions: z.number().describe('题目总数'),
  answeredQuestions: z.number().describe('已答题目数'),
  correctAnswers: z.number().describe('正确答案数'),
  wrongAnswers: z.number().describe('错误答案数'),
  unansweredQuestions: z.number().describe('未答题目数'),
  accuracy: z.number().describe('正确率'),
  timeSpent: z.number().optional().describe('用时（分钟）'),
  questionStats: z
    .array(
      z.object({
        questionId: cuidString(),
        questionType: z.string(),
        isCorrect: z.boolean().optional(),
        userAnswer: z.any().optional(),
        correctAnswer: z.any(),
        score: z.number(),
        earnedScore: z.number().optional(),
      }),
    )
    .optional()
    .describe('题目详细统计'),
});

// ============= DTO Classes =============

/**
 * 创建考试记录 DTO
 */
export class CreateExamAttemptDto extends createZodDto(
  CreateExamAttemptSchema,
) {}

/**
 * 开始考试 DTO
 */
export class StartExamDto extends createZodDto(StartExamSchema) {}

/**
 * 更新考试记录 DTO
 */
export class UpdateExamAttemptDto extends createZodDto(
  UpdateExamAttemptSchema,
) {}

/**
 * 完成考试 DTO
 */
export class CompleteExamAttemptDto extends createZodDto(
  CompleteExamAttemptSchema,
) {}

/**
 * 考试记录响应 DTO
 */
export class ExamAttemptDto extends createZodDto(ExamAttemptSchema) {}

/**
 * 考试记录查询 DTO
 */
export class QueryExamAttemptDto extends createZodDto(QueryExamAttemptSchema) {}

/**
 * 考试记录统计 DTO
 */
export class ExamAttemptStatsDto extends createZodDto(ExamAttemptStatsSchema) {}

/**
 * 用户考试统计 DTO
 */
export class UserExamStatsDto extends createZodDto(UserExamStatsSchema) {}

/**
 * 考试详细统计 DTO
 */
export class ExamDetailStatsDto extends createZodDto(ExamDetailStatsSchema) {}

// ============= Type Exports =============

export type CreateExamAttemptRequest = z.infer<typeof CreateExamAttemptSchema>;
export type StartExamRequest = z.infer<typeof StartExamSchema>;
export type UpdateExamAttemptRequest = z.infer<typeof UpdateExamAttemptSchema>;
export type CompleteExamAttemptRequest = z.infer<
  typeof CompleteExamAttemptSchema
>;
export type ExamAttemptResponse = z.infer<typeof ExamAttemptSchema>;
export type QueryExamAttemptParams = z.infer<typeof QueryExamAttemptSchema>;
export type ExamAttemptStatsResponse = z.infer<typeof ExamAttemptStatsSchema>;
export type UserExamStatsResponse = z.infer<typeof UserExamStatsSchema>;
export type ExamDetailStatsResponse = z.infer<typeof ExamDetailStatsSchema>;
