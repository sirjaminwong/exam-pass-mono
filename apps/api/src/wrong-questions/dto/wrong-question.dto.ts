import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  PaginationSchema,
  SortSchema,
  SearchSchema,
} from '../../common/utils/zod';

// ============= Wrong Question Schemas =============

/**
 * 创建错题记录 Schema
 */
export const CreateWrongQuestionSchema = z.object({
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
  isResolved: z.boolean().default(false).describe('是否已解决'),
});

/**
 * 添加错题 Schema（简化版）
 */
export const AddWrongQuestionSchema = z.object({
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
});

/**
 * 批量标记为已解决 Schema
 */
export const BulkMarkAsResolvedSchema = z.object({
  ids: z.array(cuidString()).min(1).describe('错题记录ID列表'),
});

/**
 * 批量删除错题记录 Schema
 */
export const BulkRemoveWrongQuestionsSchema = z.object({
  ids: z.array(cuidString()).min(1).describe('错题记录ID列表'),
});

/**
 * 更新错题记录 Schema
 */
export const UpdateWrongQuestionSchema = z.object({
  isResolved: z.boolean().optional().describe('是否已解决'),
});

/**
 * 错题记录 Schema
 */
export const WrongQuestionSchema = z.object({
  id: cuidString().describe('错题记录ID'),
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
  addedAt: dateString().describe('添加时间'),
  isResolved: z.boolean().describe('是否已解决'),
  resolvedAt: dateString().nullable().describe('解决时间'),
});

/**
 * 错题记录查询 Schema
 */
export const QueryWrongQuestionSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      userId: cuidString().optional().describe('按用户ID筛选'),
      questionId: cuidString().optional().describe('按题目ID筛选'),
      isResolved: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return undefined;
          return val === 'true';
        })
        .pipe(z.boolean().optional())
        .describe('按解决状态筛选'),
      addedAfter: dateString().optional().describe('添加时间起始筛选'),
      addedBefore: dateString().optional().describe('添加时间结束筛选'),
      resolvedAfter: dateString().optional().describe('解决时间起始筛选'),
      resolvedBefore: dateString().optional().describe('解决时间结束筛选'),
    }),
  );

/**
 * 错题统计 Schema
 */
export const WrongQuestionStatsSchema = z.object({
  totalCount: z.number().min(0).describe('总错题数量'),
  resolvedCount: z.number().min(0).describe('已解决错题数量'),
  unresolvedCount: z.number().min(0).describe('未解决错题数量'),
  todayCount: z.number().min(0).describe('今日新增错题数量'),
  weekCount: z.number().min(0).describe('本周新增错题数量'),
  monthCount: z.number().min(0).describe('本月新增错题数量'),
  resolvedTodayCount: z.number().min(0).describe('今日解决错题数量'),
  resolvedWeekCount: z.number().min(0).describe('本周解决错题数量'),
  resolvedMonthCount: z.number().min(0).describe('本月解决错题数量'),
  resolutionRate: z.number().min(0).max(100).describe('错题解决率（百分比）'),
});

/**
 * 按题型分类的错题统计 Schema
 */
export const WrongQuestionsByTypeSchema = z.object({
  questionType: z.string().describe('题目类型'),
  totalCount: z.number().min(0).describe('该类型总错题数量'),
  resolvedCount: z.number().min(0).describe('该类型已解决错题数量'),
  unresolvedCount: z.number().min(0).describe('该类型未解决错题数量'),
  resolutionRate: z.number().min(0).max(100).describe('该类型错题解决率'),
  percentage: z.number().min(0).max(100).describe('占总错题的百分比'),
});

/**
 * 获取用户未解决错题 Schema
 */
export const GetUnresolvedWrongQuestionsSchema = z.object({
  userId: cuidString().describe('用户ID'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 50))
    .pipe(z.number().min(1).max(100))
    .describe('获取数量限制，默认为 50'),
});

/**
 * 标记错题为已解决 Schema
 */
export const MarkAsResolvedSchema = z.object({
  id: cuidString().describe('错题记录ID'),
});

/**
 * 标记错题为未解决 Schema
 */
export const MarkAsUnresolvedSchema = z.object({
  id: cuidString().describe('错题记录ID'),
});

// ============= DTO Classes =============

/**
 * 创建错题记录 DTO
 */
export class CreateWrongQuestionDto extends createZodDto(
  CreateWrongQuestionSchema,
) {}

/**
 * 添加错题 DTO
 */
export class AddWrongQuestionDto extends createZodDto(AddWrongQuestionSchema) {}

/**
 * 批量标记为已解决 DTO
 */
export class BulkMarkAsResolvedDto extends createZodDto(
  BulkMarkAsResolvedSchema,
) {}

/**
 * 批量删除错题记录 DTO
 */
export class BulkRemoveWrongQuestionsDto extends createZodDto(
  BulkRemoveWrongQuestionsSchema,
) {}

/**
 * 更新错题记录 DTO
 */
export class UpdateWrongQuestionDto extends createZodDto(
  UpdateWrongQuestionSchema,
) {}

/**
 * 错题记录 DTO
 */
export class WrongQuestionDto extends createZodDto(WrongQuestionSchema) {}

/**
 * 错题记录查询 DTO
 */
export class QueryWrongQuestionDto extends createZodDto(
  QueryWrongQuestionSchema,
) {}

/**
 * 错题统计 DTO
 */
export class WrongQuestionStatsDto extends createZodDto(
  WrongQuestionStatsSchema,
) {}

/**
 * 按题型分类的错题统计 DTO
 */
export class WrongQuestionsByTypeDto extends createZodDto(
  WrongQuestionsByTypeSchema,
) {}

/**
 * 获取用户未解决错题 DTO
 */
export class GetUnresolvedWrongQuestionsDto extends createZodDto(
  GetUnresolvedWrongQuestionsSchema,
) {}

/**
 * 标记错题为已解决 DTO
 */
export class MarkAsResolvedDto extends createZodDto(MarkAsResolvedSchema) {}

/**
 * 标记错题为未解决 DTO
 */
export class MarkAsUnresolvedDto extends createZodDto(MarkAsUnresolvedSchema) {}

// ============= Type Exports =============

export type CreateWrongQuestion = z.infer<typeof CreateWrongQuestionSchema>;
export type AddWrongQuestion = z.infer<typeof AddWrongQuestionSchema>;
export type BulkMarkAsResolved = z.infer<typeof BulkMarkAsResolvedSchema>;
export type BulkRemoveWrongQuestions = z.infer<
  typeof BulkRemoveWrongQuestionsSchema
>;
export type UpdateWrongQuestion = z.infer<typeof UpdateWrongQuestionSchema>;
export type WrongQuestion = z.infer<typeof WrongQuestionSchema>;
export type QueryWrongQuestion = z.infer<typeof QueryWrongQuestionSchema>;
export type WrongQuestionStats = z.infer<typeof WrongQuestionStatsSchema>;
export type WrongQuestionsByType = z.infer<typeof WrongQuestionsByTypeSchema>;
export type GetUnresolvedWrongQuestions = z.infer<
  typeof GetUnresolvedWrongQuestionsSchema
>;
export type MarkAsResolved = z.infer<typeof MarkAsResolvedSchema>;
export type MarkAsUnresolved = z.infer<typeof MarkAsUnresolvedSchema>;
