import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  PaginationSchema,
  SortSchema,
  SearchSchema,
  QuestionOptionsSchema,
  CorrectAnswerSchema,
  jsonField,
  optionalJsonField,
} from '../../common/utils/zod';

// ============= ExamQuestion Schemas =============

/**
 * 创建试卷题目关联 Schema
 */
export const CreateExamQuestionSchema = z.object({
  examId: cuidString().describe('试卷ID'),
  questionId: cuidString().describe('题目ID'),
  order: z
    .number()
    .min(1, { message: '题目顺序必须大于0' })
    .describe('题目在试卷中的顺序'),
});

/**
 * 添加题目到试卷 Schema
 */
export const AddQuestionToExamSchema = z.object({
  examId: cuidString().describe('试卷ID'),
  questionId: cuidString().describe('题目ID'),
  order: z
    .number()
    .min(1, { message: '题目顺序必须大于0' })
    .describe('题目在试卷中的顺序'),
});

/**
 * 批量添加题目 Schema
 */
export const BulkAddQuestionsSchema = z.object({
  examId: cuidString().describe('试卷ID'),
  questionIds: z
    .array(cuidString())
    .min(1, { message: '至少需要添加一道题目' })
    .max(100, { message: '一次最多添加100道题目' })
    .describe('题目ID列表'),
});

/**
 * 批量删除题目 Schema
 */
export const BulkRemoveSchema = z.object({
  ids: z
    .array(cuidString())
    .min(1, { message: '至少需要删除一条记录' })
    .max(100, { message: '一次最多删除100条记录' })
    .describe('试卷题目关联记录ID列表'),
});

/**
 * 更新试卷题目关联 Schema
 */
export const UpdateExamQuestionSchema = z.object({
  order: z
    .number()
    .min(1, { message: '题目顺序必须大于0' })
    .optional()
    .describe('题目在试卷中的顺序'),
});

/**
 * 试卷题目关联响应 Schema
 */
export const ExamQuestionSchema = z.object({
  id: cuidString().describe('试卷题目关联记录ID'),
  examId: cuidString().describe('试卷ID'),
  questionId: cuidString().describe('题目ID'),
  order: z.number().describe('题目在试卷中的顺序'),
  // 关联数据
  exam: z
    .object({
      id: cuidString(),
      title: z.string(),
      description: z.string().optional(),
      classId: z.string().optional(),
      isActive: z.boolean(),
      createdAt: dateString(),
      updatedAt: dateString(),
    })
    .optional()
    .describe('关联的试卷信息'),
  question: z
    .object({
      id: cuidString(),
      type: z.enum([
        'SINGLE_CHOICE',
        'MULTIPLE_CHOICE',
        'TRUE_FALSE',
        'INDEFINITE_CHOICE',
      ]),
      content: z.string(),
      options: optionalJsonField(QuestionOptionsSchema),
      correctAnswer: jsonField(CorrectAnswerSchema),
      explanation: z.string().optional(),
      score: z.number(),
      createdAt: dateString(),
      updatedAt: dateString(),
    })
    .optional()
    .describe('关联的题目信息'),
});

/**
 * 试卷题目关联查询 Schema
 */
export const QueryExamQuestionSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      examId: cuidString().optional().describe('按试卷ID筛选'),
      questionId: cuidString().optional().describe('按题目ID筛选'),
      orderFrom: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : undefined))
        .pipe(z.number().min(1).optional())
        .describe('题目顺序范围起始'),
      orderTo: z
        .string()
        .optional()
        .transform((val) => (val ? parseInt(val, 10) : undefined))
        .pipe(z.number().min(1).optional())
        .describe('题目顺序范围结束'),
    }),
  );

/**
 * 试卷题目统计 Schema
 */
export const ExamQuestionStatsSchema = z.object({
  examId: cuidString().describe('试卷ID'),
  totalQuestions: z.number().describe('题目总数'),
  questionsByType: z
    .record(
      z.enum([
        'SINGLE_CHOICE',
        'MULTIPLE_CHOICE',
        'TRUE_FALSE',
        'INDEFINITE_CHOICE',
      ]),
      z.number(),
    )
    .describe('按类型分组的题目数量'),
  totalScore: z.number().describe('试卷总分'),
  averageScore: z.number().describe('平均分值'),
});

// ============= DTO Classes =============

/**
 * 创建试卷题目关联 DTO
 */
export class CreateExamQuestionDto extends createZodDto(
  CreateExamQuestionSchema,
) {}

/**
 * 添加题目到试卷 DTO
 */
export class AddQuestionToExamDto extends createZodDto(
  AddQuestionToExamSchema,
) {}

/**
 * 批量添加题目 DTO
 */
export class BulkAddQuestionsDto extends createZodDto(BulkAddQuestionsSchema) {}

/**
 * 批量删除题目 DTO
 */
export class BulkRemoveDto extends createZodDto(BulkRemoveSchema) {}

/**
 * 更新试卷题目关联 DTO
 */
export class UpdateExamQuestionDto extends createZodDto(
  UpdateExamQuestionSchema,
) {}

/**
 * 试卷题目关联响应 DTO
 */
export class ExamQuestionDto extends createZodDto(ExamQuestionSchema) {}

/**
 * 试卷题目关联查询 DTO
 */
export class QueryExamQuestionDto extends createZodDto(
  QueryExamQuestionSchema,
) {}

/**
 * 试卷题目统计 DTO
 */
export class ExamQuestionStatsDto extends createZodDto(
  ExamQuestionStatsSchema,
) {}

// ============= Type Exports =============

export type CreateExamQuestionRequest = z.infer<
  typeof CreateExamQuestionSchema
>;
export type AddQuestionToExamRequest = z.infer<typeof AddQuestionToExamSchema>;
export type BulkAddQuestionsRequest = z.infer<typeof BulkAddQuestionsSchema>;
export type BulkRemoveRequest = z.infer<typeof BulkRemoveSchema>;
export type UpdateExamQuestionRequest = z.infer<
  typeof UpdateExamQuestionSchema
>;
export type ExamQuestionResponse = z.infer<typeof ExamQuestionSchema>;
export type QueryExamQuestionParams = z.infer<typeof QueryExamQuestionSchema>;
export type ExamQuestionStatsResponse = z.infer<typeof ExamQuestionStatsSchema>;
