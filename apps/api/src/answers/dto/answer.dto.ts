import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  scoreNumber,
  dateString,
  PaginationSchema,
  SortSchema,
  SearchSchema,
  UserAnswerSchema,
  jsonField,
} from '../../common/utils/zod';

// ============= Answer Schemas =============

/**
 * 创建答题记录 Schema
 */
export const CreateAnswerSchema = z.object({
  attemptId: cuidString().describe('考试记录ID'),
  questionId: cuidString().describe('题目ID'),
  userAnswer: UserAnswerSchema.describe('用户答案'),
  isCorrect: z.boolean().optional().describe('是否正确'),
  score: scoreNumber().optional().describe('得分'),
});

/**
 * 更新答题记录 Schema
 */
export const UpdateAnswerSchema = z.object({
  userAnswer: UserAnswerSchema.optional().describe('用户答案'),
  isCorrect: z.boolean().optional().describe('是否正确'),
  score: scoreNumber().optional().describe('得分'),
});

/**
 * 提交答案 Schema
 */
export const SubmitAnswerSchema = z.object({
  attemptId: cuidString().describe('考试记录ID'),
  questionId: cuidString().describe('题目ID'),
  userAnswer: UserAnswerSchema.describe('用户答案'),
});

/**
 * 批量提交答案 Schema
 */
export const BatchSubmitAnswersSchema = z.object({
  attemptId: cuidString().describe('考试记录ID'),
  answers: z
    .array(
      z.object({
        questionId: cuidString().describe('题目ID'),
        userAnswer: UserAnswerSchema.describe('用户答案'),
      }),
    )
    .min(1)
    .describe('答案列表'),
});

/**
 * 查询答题记录 Schema
 */
export const QueryAnswersSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      attemptId: cuidString().optional().describe('考试记录ID'),
      questionId: cuidString().optional().describe('题目ID'),
      isCorrect: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return undefined;
          return val === 'true';
        })
        .pipe(z.boolean().optional())
        .describe('是否正确'),
    }),
  );

/**
 * 答题统计查询 Schema
 */
export const AnswerStatsQuerySchema = z.object({
  attemptId: cuidString().optional().describe('考试记录ID'),
  questionId: cuidString().optional().describe('题目ID'),
  userId: cuidString().optional().describe('用户ID'),
});

/**
 * 答题记录响应 Schema
 */
export const AnswerSchema = z.object({
  id: cuidString().describe('答题记录ID'),
  attemptId: cuidString().describe('考试记录ID'),
  questionId: cuidString().describe('题目ID'),
  userAnswer: jsonField(UserAnswerSchema).describe('用户答案'),
  isCorrect: z.boolean().describe('是否正确'),
  score: scoreNumber().describe('得分'),
  answeredAt: dateString().describe('答题时间'),
});

/**
 * 答题记录详情响应 Schema（包含关联数据）
 */
export const AnswerDetailSchema = AnswerSchema.extend({
  attempt: z
    .object({
      id: cuidString().describe('考试记录ID'),
      userId: cuidString().describe('用户ID'),
      examId: cuidString().describe('试卷ID'),
      isCompleted: z.boolean().describe('是否完成'),
    })
    .optional()
    .describe('考试记录信息'),
  question: z
    .object({
      id: cuidString().describe('题目ID'),
      type: z
        .enum([
          'SINGLE_CHOICE',
          'MULTIPLE_CHOICE',
          'TRUE_FALSE',
          'INDEFINITE_CHOICE',
        ])
        .describe('题目类型'),
      content: z.string().describe('题目内容'),
      correctAnswer: jsonField(UserAnswerSchema).describe('正确答案'),
      score: scoreNumber().describe('题目分值'),
    })
    .optional()
    .describe('题目信息'),
});

/**
 * 答题统计响应 Schema
 */
export const AnswerStatsSchema = z.object({
  totalAnswers: z.number().describe('总答题数'),
  correctAnswers: z.number().describe('正确答题数'),
  incorrectAnswers: z.number().describe('错误答题数'),
  accuracy: z.number().min(0).max(1).describe('正确率'),
  totalScore: scoreNumber().describe('总得分'),
  maxScore: scoreNumber().describe('总分值'),
  scoreRate: z.number().min(0).max(1).describe('得分率'),
});

// ============= DTO Classes =============

/**
 * 创建答题记录 DTO
 */
export class CreateAnswerDto extends createZodDto(CreateAnswerSchema) {}

/**
 * 更新答题记录 DTO
 */
export class UpdateAnswerDto extends createZodDto(UpdateAnswerSchema) {}

/**
 * 提交答案 DTO
 */
export class SubmitAnswerDto extends createZodDto(SubmitAnswerSchema) {}

/**
 * 批量提交答案 DTO
 */
export class BatchSubmitAnswersDto extends createZodDto(
  BatchSubmitAnswersSchema,
) {}

/**
 * 查询答题记录 DTO
 */
export class QueryAnswersDto extends createZodDto(QueryAnswersSchema) {}

/**
 * 答题统计查询 DTO
 */
export class AnswerStatsQueryDto extends createZodDto(AnswerStatsQuerySchema) {}

/**
 * 答题记录响应 DTO
 */
export class AnswerDto extends createZodDto(AnswerSchema) {}

/**
 * 答题记录详情响应 DTO
 */
export class AnswerDetailDto extends createZodDto(AnswerDetailSchema) {}

/**
 * 答题统计响应 DTO
 */
export class AnswerStatsDto extends createZodDto(AnswerStatsSchema) {}

// ============= Type Exports =============

export type CreateAnswerRequest = z.infer<typeof CreateAnswerSchema>;
export type UpdateAnswerRequest = z.infer<typeof UpdateAnswerSchema>;
export type SubmitAnswerRequest = z.infer<typeof SubmitAnswerSchema>;
export type BatchSubmitAnswersRequest = z.infer<
  typeof BatchSubmitAnswersSchema
>;
export type QueryAnswersParams = z.infer<typeof QueryAnswersSchema>;
export type AnswerStatsQueryParams = z.infer<typeof AnswerStatsQuerySchema>;
export type AnswerResponse = z.infer<typeof AnswerSchema>;
export type AnswerDetailResponse = z.infer<typeof AnswerDetailSchema>;
export type AnswerStatsResponse = z.infer<typeof AnswerStatsSchema>;
