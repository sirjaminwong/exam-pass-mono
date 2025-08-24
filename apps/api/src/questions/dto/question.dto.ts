import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  QuestionTypeEnum,
  scoreNumber,
  QuestionOptionsSchema,
  CorrectAnswerSchema,
  UserAnswerSchema,
  jsonField,
  optionalJsonField,
} from '../../common/utils/zod';

// ============= Question Schemas =============

/**
 * 创建题目 Schema
 */
export const CreateQuestionSchema = z.object({
  type: QuestionTypeEnum.describe('题目类型'),
  content: z
    .string({ message: '题目内容不能为空' })
    .min(1, { message: '题目内容不能为空' })
    .max(2000, { message: '题目内容不能超过2000个字符' })
    .describe('题目内容'),
  options: optionalJsonField(QuestionOptionsSchema).describe(
    '选项列表（选择题使用，JSON格式）',
  ),
  correctAnswer:
    jsonField(CorrectAnswerSchema).describe('正确答案（JSON格式）'),
  explanation: z
    .string()
    .max(1000, { message: '解析不能超过1000个字符' })
    .optional()
    .describe('答案解析'),
  score: scoreNumber().describe('题目分值'),
});

/**
 * 更新题目 Schema
 */
export const UpdateQuestionSchema = z.object({
  type: QuestionTypeEnum.optional().describe('题目类型'),
  content: z
    .string()
    .min(1, { message: '题目内容不能为空' })
    .max(2000, { message: '题目内容不能超过2000个字符' })
    .optional()
    .describe('题目内容'),
  options: optionalJsonField(QuestionOptionsSchema).describe(
    '选项列表（选择题使用，JSON格式）',
  ),
  correctAnswer: jsonField(CorrectAnswerSchema)
    .optional()
    .describe('正确答案（JSON格式）'),
  explanation: z
    .string()
    .max(1000, { message: '解析不能超过1000个字符' })
    .optional()
    .describe('答案解析'),
  score: scoreNumber().optional().describe('题目分值'),
});

/**
 * 题目响应 Schema
 */
export const QuestionSchema = z.object({
  id: cuidString().describe('题目ID'),
  type: QuestionTypeEnum.describe('题目类型'),
  content: z.string().describe('题目内容'),
  options: optionalJsonField(QuestionOptionsSchema).describe('选项列表'),
  correctAnswer: jsonField(CorrectAnswerSchema).describe('正确答案'),
  explanation: z.string().nullable().describe('答案解析'),
  score: z.number().describe('题目分值'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
});

/**
 * 题目查询 Schema
 */
export const QueryQuestionSchema = z.object({
  type: QuestionTypeEnum.optional().describe('按题目类型筛选'),
  content: z.string().optional().describe('按题目内容搜索'),
  minScore: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional())
    .describe('最小分值'),
  maxScore: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : undefined))
    .pipe(z.number().min(0).optional())
    .describe('最大分值'),
  search: z.string().optional().describe('搜索关键词（题目内容）'),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1))
    .describe('页码'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().min(1).max(100))
    .describe('每页数量'),
});

/**
 * 题目答案提交 Schema
 */
export const SubmitAnswerSchema = z.object({
  questionId: cuidString().describe('题目ID'),
  userAnswer: jsonField(UserAnswerSchema).describe('用户答案（JSON格式）'),
});

/**
 * 批量创建题目 Schema
 */
export const CreateQuestionsSchema = z.object({
  questions: z
    .array(CreateQuestionSchema)
    .min(1, { message: '至少需要一道题目' })
    .max(100, { message: '一次最多创建100道题目' })
    .describe('题目列表'),
});

/**
 * 题目统计 Schema
 */
export const QuestionStatsSchema = z.object({
  totalQuestions: z.number().describe('题目总数'),
  questionsByType: z
    .record(QuestionTypeEnum, z.number())
    .describe('按类型分组的题目数量'),
  averageScore: z.number().describe('平均分值'),
  totalScore: z.number().describe('总分值'),
});

// ============= DTO Classes =============

/**
 * 创建题目 DTO
 */
export class CreateQuestionDto extends createZodDto(CreateQuestionSchema) {}

/**
 * 更新题目 DTO
 */
export class UpdateQuestionDto extends createZodDto(UpdateQuestionSchema) {}

/**
 * 题目响应 DTO
 */
export class QuestionDto extends createZodDto(QuestionSchema) {}

/**
 * 题目查询 DTO
 */
export class QueryQuestionDto extends createZodDto(QueryQuestionSchema) {}

/**
 * 题目答案提交 DTO
 */
export class SubmitAnswerDto extends createZodDto(SubmitAnswerSchema) {}

/**
 * 批量创建题目 DTO
 */
export class CreateQuestionsDto extends createZodDto(CreateQuestionsSchema) {}

/**
 * 题目统计 DTO
 */
export class QuestionStatsDto extends createZodDto(QuestionStatsSchema) {}

// ============= Type Exports =============

export type CreateQuestionRequest = z.infer<typeof CreateQuestionSchema>;
export type UpdateQuestionRequest = z.infer<typeof UpdateQuestionSchema>;
export type QuestionResponse = z.infer<typeof QuestionSchema>;
export type QueryQuestionParams = z.infer<typeof QueryQuestionSchema>;
export type SubmitAnswerRequest = z.infer<typeof SubmitAnswerSchema>;
export type CreateQuestionsRequest = z.infer<typeof CreateQuestionsSchema>;
export type QuestionStatsResponse = z.infer<typeof QuestionStatsSchema>;
