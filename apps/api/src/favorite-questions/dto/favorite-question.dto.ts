import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  PaginationSchema,
  SortSchema,
  SearchSchema,
} from '../../common/utils/zod';

// ============= Favorite Question Schemas =============

/**
 * 创建收藏题目 Schema
 */
export const CreateFavoriteQuestionSchema = z.object({
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
  note: z.string().optional().describe('收藏备注'),
});

/**
 * 添加收藏题目 Schema（简化版）
 */
export const AddFavoriteQuestionSchema = z.object({
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
  note: z.string().optional().describe('收藏备注'),
});

/**
 * 批量删除收藏题目 Schema
 */
export const BulkRemoveFavoriteQuestionsSchema = z.object({
  ids: z.array(cuidString()).min(1).describe('收藏题目记录ID列表'),
});

/**
 * 更新收藏题目 Schema
 */
export const UpdateFavoriteQuestionSchema = z.object({
  note: z.string().optional().describe('收藏备注'),
});

/**
 * 更新收藏题目备注 Schema
 */
export const UpdateFavoriteQuestionNoteSchema = z.object({
  note: z.string().min(1).describe('新的备注内容'),
});

/**
 * 收藏题目 Schema
 */
export const FavoriteQuestionSchema = z.object({
  id: cuidString().describe('收藏题目记录ID'),
  userId: cuidString().describe('用户ID'),
  questionId: cuidString().describe('题目ID'),
  addedAt: dateString().describe('收藏时间'),
  note: z.string().nullable().describe('收藏备注'),
});

/**
 * 收藏题目查询 Schema
 */
export const QueryFavoriteQuestionSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      userId: cuidString().optional().describe('按用户ID筛选'),
      questionId: cuidString().optional().describe('按题目ID筛选'),
      hasNote: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return undefined;
          return val === 'true';
        })
        .pipe(z.boolean().optional())
        .describe('按是否有备注筛选'),
      addedAfter: dateString().optional().describe('收藏时间起始筛选'),
      addedBefore: dateString().optional().describe('收藏时间结束筛选'),
    }),
  );

/**
 * 收藏题目统计 Schema
 */
export const FavoriteQuestionStatsSchema = z.object({
  totalCount: z.number().min(0).describe('总收藏数量'),
  todayCount: z.number().min(0).describe('今日收藏数量'),
  weekCount: z.number().min(0).describe('本周收藏数量'),
  monthCount: z.number().min(0).describe('本月收藏数量'),
  withNoteCount: z.number().min(0).describe('有备注的收藏数量'),
  withoutNoteCount: z.number().min(0).describe('无备注的收藏数量'),
});

/**
 * 按题型分类的收藏题目统计项 Schema
 */
export const FavoriteQuestionsByTypeItemSchema = z.object({
  questionType: z.string().describe('题目类型'),
  count: z.number().min(0).describe('该类型收藏数量'),
  percentage: z.number().min(0).max(100).describe('占总收藏的百分比'),
});

/**
 * 按题型分类的收藏题目统计 Schema
 */
export const FavoriteQuestionsByTypeSchema = z.array(
  FavoriteQuestionsByTypeItemSchema,
);

/**
 * 搜索收藏题目 Schema
 */
export const SearchFavoriteQuestionsSchema = z.object({
  userId: cuidString().describe('用户ID'),
  query: z.string().min(1).describe('搜索关键词'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .pipe(z.number().min(1).max(100))
    .describe('搜索结果数量限制，默认为 20'),
});

/**
 * 获取最近收藏题目 Schema
 */
export const GetRecentFavoriteQuestionsSchema = z.object({
  userId: cuidString().describe('用户ID'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().min(1).max(50))
    .describe('获取数量限制，默认为 10'),
});

// ============= DTO Classes =============

/**
 * 创建收藏题目 DTO
 */
export class CreateFavoriteQuestionDto extends createZodDto(
  CreateFavoriteQuestionSchema,
) {}

/**
 * 添加收藏题目 DTO
 */
export class AddFavoriteQuestionDto extends createZodDto(
  AddFavoriteQuestionSchema,
) {}

/**
 * 批量删除收藏题目 DTO
 */
export class BulkRemoveFavoriteQuestionsDto extends createZodDto(
  BulkRemoveFavoriteQuestionsSchema,
) {}

/**
 * 更新收藏题目 DTO
 */
export class UpdateFavoriteQuestionDto extends createZodDto(
  UpdateFavoriteQuestionSchema,
) {}

/**
 * 更新收藏题目备注 DTO
 */
export class UpdateFavoriteQuestionNoteDto extends createZodDto(
  UpdateFavoriteQuestionNoteSchema,
) {}

/**
 * 收藏题目 DTO
 */
export class FavoriteQuestionDto extends createZodDto(FavoriteQuestionSchema) {}

/**
 * 收藏题目查询 DTO
 */
export class QueryFavoriteQuestionDto extends createZodDto(
  QueryFavoriteQuestionSchema,
) {}

/**
 * 收藏题目统计 DTO
 */
export class FavoriteQuestionStatsDto extends createZodDto(
  FavoriteQuestionStatsSchema,
) {}

/**
 * 按题型分类的收藏题目统计项 DTO
 */
export class FavoriteQuestionsByTypeItemDto extends createZodDto(
  FavoriteQuestionsByTypeItemSchema,
) {}

/**
 * 按题型分类的收藏题目统计 DTO
 */
export class FavoriteQuestionsByTypeDto extends createZodDto(
  FavoriteQuestionsByTypeSchema,
) {}

/**
 * 搜索收藏题目 DTO
 */
export class SearchFavoriteQuestionsDto extends createZodDto(
  SearchFavoriteQuestionsSchema,
) {}

/**
 * 获取最近收藏题目 DTO
 */
export class GetRecentFavoriteQuestionsDto extends createZodDto(
  GetRecentFavoriteQuestionsSchema,
) {}

// ============= Type Exports =============

export type CreateFavoriteQuestion = z.infer<
  typeof CreateFavoriteQuestionSchema
>;
export type AddFavoriteQuestion = z.infer<typeof AddFavoriteQuestionSchema>;
export type BulkRemoveFavoriteQuestions = z.infer<
  typeof BulkRemoveFavoriteQuestionsSchema
>;
export type UpdateFavoriteQuestion = z.infer<
  typeof UpdateFavoriteQuestionSchema
>;
export type UpdateFavoriteQuestionNote = z.infer<
  typeof UpdateFavoriteQuestionNoteSchema
>;
export type FavoriteQuestion = z.infer<typeof FavoriteQuestionSchema>;
export type QueryFavoriteQuestion = z.infer<typeof QueryFavoriteQuestionSchema>;
export type FavoriteQuestionStats = z.infer<typeof FavoriteQuestionStatsSchema>;
export type FavoriteQuestionsByType = z.infer<
  typeof FavoriteQuestionsByTypeSchema
>;
export type SearchFavoriteQuestions = z.infer<
  typeof SearchFavoriteQuestionsSchema
>;
export type GetRecentFavoriteQuestions = z.infer<
  typeof GetRecentFavoriteQuestionsSchema
>;
