import { z } from 'zod';

/**
 * 日期字符串验证器
 * 验证 ISO 8601 格式的日期字符串
 */
export const dateString = () =>
  z.string().datetime({ message: '必须是有效的 ISO 8601 日期格式' });

/**
 * CUID 验证器
 * 验证 Prisma 生成的 CUID 格式
 */
export const cuidString = () =>
  z.string().cuid({ message: '必须是有效的 CUID 格式' });

/**
 * 邮箱验证器
 */
export const emailString = () =>
  z.string().email({ message: '必须是有效的邮箱格式' });

/**
 * 密码验证器
 * 至少 6 位字符
 */
export const passwordString = () =>
  z.string().min(6, { message: '密码至少需要 6 位字符' });

/**
 * 分页查询参数 Schema
 */
export const PaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1, { message: '页码必须大于 0' }))
    .describe('页码，默认为 1'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().min(1).max(100, { message: '每页数量必须在 1-100 之间' }))
    .describe('每页数量，默认为 10，最大 100'),
});

/**
 * 排序参数 Schema
 */
export const SortSchema = z.object({
  sortBy: z.string().optional().describe('排序字段'),
  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .default('desc')
    .describe('排序方向，asc 或 desc'),
});

/**
 * 搜索参数 Schema
 */
export const SearchSchema = z.object({
  search: z.string().optional().describe('搜索关键词'),
});

/**
 * 组合查询参数 Schema
 */
export const QuerySchema =
  PaginationSchema.merge(SortSchema).merge(SearchSchema);

/**
 * JSON 字段验证器
 * 用于验证存储在数据库中的 JSON 字段
 */
export const jsonField = <T>(schema: z.ZodSchema<T>) =>
  z.union([
    z.string().transform((str) => {
      try {
        return JSON.parse(str) as T;
      } catch {
        throw new Error('无效的 JSON 格式');
      }
    }),
    schema,
  ]);

/**
 * 可选的 JSON 字段验证器
 */
export const optionalJsonField = <T>(schema: z.ZodSchema<T>) =>
  jsonField(schema).optional();

/**
 * 用户角色枚举
 */
export const UserRoleEnum = z.enum(['STUDENT', 'TEACHER', 'ADMIN']);

/**
 * 题目类型枚举
 */
export const QuestionTypeEnum = z.enum([
  'SINGLE_CHOICE',
  'MULTIPLE_CHOICE',
  'TRUE_FALSE',
  'INDEFINITE_CHOICE',
]);

/**
 * 分数验证器
 */
export const scoreNumber = () =>
  z.number().min(0, { message: '分数不能为负数' });

/**
 * 正确率验证器 (0-1 之间的小数)
 */
export const accuracyNumber = () =>
  z.number().min(0).max(1, { message: '正确率必须在 0-1 之间' });

/**
 * 题目选项验证器
 */
export const QuestionOptionsSchema = z.array(z.string()).min(2, {
  message: '选择题至少需要 2 个选项',
});

/**
 * 题目正确答案验证器
 * 支持单选、多选、判断题等不同格式
 */
export const CorrectAnswerSchema = z.union([
  z.string(), // 单选题答案 (如 "A")
  z.array(z.string()), // 多选题答案 (如 ["A", "C"])
  z.boolean(), // 判断题答案
]);

/**
 * 用户答案验证器
 * 与正确答案格式相同
 */
export const UserAnswerSchema = CorrectAnswerSchema;
