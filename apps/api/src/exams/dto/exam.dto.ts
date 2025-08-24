import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { cuidString, dateString, accuracyNumber } from '../../common/utils/zod';

// ============= Exam Schemas =============

/**
 * 创建试卷 Schema
 */
export const CreateExamSchema = z.object({
  title: z
    .string({ message: '试卷标题不能为空' })
    .min(1, { message: '试卷标题不能为空' })
    .max(200, { message: '试卷标题不能超过200个字符' })
    .describe('试卷标题'),
  description: z
    .string()
    .max(1000, { message: '试卷描述不能超过1000个字符' })
    .optional()
    .describe('试卷描述'),
  classId: cuidString().optional().describe('所属班级ID'),
  isActive: z.boolean().optional().default(true).describe('是否启用'),
});

/**
 * 更新试卷 Schema
 */
export const UpdateExamSchema = z.object({
  title: z
    .string()
    .min(1, { message: '试卷标题不能为空' })
    .max(200, { message: '试卷标题不能超过200个字符' })
    .optional()
    .describe('试卷标题'),
  description: z
    .string()
    .max(1000, { message: '试卷描述不能超过1000个字符' })
    .optional()
    .describe('试卷描述'),
  classId: cuidString().optional().describe('所属班级ID'),
  isActive: z.boolean().optional().describe('是否启用'),
});

/**
 * 试卷响应 Schema
 */
export const ExamSchema = z.object({
  id: cuidString().describe('试卷ID'),
  title: z.string().describe('试卷标题'),
  description: z.string().optional().describe('试卷描述'),
  classId: z.string().optional().describe('所属班级ID'),
  isActive: z.boolean().describe('是否启用'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
});

/**
 * 试卷查询 Schema
 */
export const QueryExamSchema = z.object({
  title: z.string().optional().describe('按标题搜索'),
  classId: cuidString().optional().describe('按班级筛选'),
  isActive: z
    .string()
    .optional()
    .transform((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    })
    .describe('按启用状态筛选'),
  search: z.string().optional().describe('搜索关键词（标题或描述）'),
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
 * 试卷详情 Schema（包含题目）
 */
export const ExamDetailSchema = ExamSchema.extend({
  questions: z
    .array(
      z.object({
        id: cuidString().describe('题目ID'),
        order: z.number().describe('题目顺序'),
        question: z.object({
          id: cuidString().describe('题目ID'),
          type: z.string().describe('题目类型'),
          content: z.string().describe('题目内容'),
          options: z.any().optional().describe('选项列表'),
          score: z.number().describe('题目分值'),
        }),
      }),
    )
    .describe('试卷题目列表'),
  totalScore: z.number().describe('试卷总分'),
  questionCount: z.number().describe('题目数量'),
});

/**
 * 添加题目到试卷 Schema
 */
export const AddQuestionToExamSchema = z.object({
  questionId: cuidString().describe('题目ID'),
  order: z.number().min(1).describe('题目顺序'),
});

/**
 * 批量添加题目到试卷 Schema
 */
export const AddQuestionsToExamSchema = z.object({
  questions: z
    .array(AddQuestionToExamSchema)
    .min(1, { message: '至少需要添加一道题目' })
    .describe('题目列表'),
});

/**
 * 试卷统计 Schema
 */
export const ExamStatsSchema = z.object({
  totalExams: z.number().describe('试卷总数'),
  activeExams: z.number().describe('启用的试卷数'),
  totalAttempts: z.number().describe('总考试次数'),
  averageScore: z.number().describe('平均分'),
  passRate: accuracyNumber().describe('通过率'),
});

// ============= DTO Classes =============

/**
 * 创建试卷 DTO
 */
export class CreateExamDto extends createZodDto(CreateExamSchema) {}

/**
 * 更新试卷 DTO
 */
export class UpdateExamDto extends createZodDto(UpdateExamSchema) {}

/**
 * 试卷响应 DTO
 */
export class ExamDto extends createZodDto(ExamSchema) {}

/**
 * 试卷查询 DTO
 */
export class QueryExamDto extends createZodDto(QueryExamSchema) {}

/**
 * 试卷详情 DTO
 */
export class ExamDetailDto extends createZodDto(ExamDetailSchema) {}

/**
 * 添加题目到试卷 DTO
 */
export class AddQuestionToExamDto extends createZodDto(
  AddQuestionToExamSchema,
) {}

/**
 * 批量添加题目到试卷 DTO
 */
export class AddQuestionsToExamDto extends createZodDto(
  AddQuestionsToExamSchema,
) {}

/**
 * 试卷统计 DTO
 */
export class ExamStatsDto extends createZodDto(ExamStatsSchema) {}

// ============= Type Exports =============

export type CreateExamRequest = z.infer<typeof CreateExamSchema>;
export type UpdateExamRequest = z.infer<typeof UpdateExamSchema>;
export type ExamResponse = z.infer<typeof ExamSchema>;
export type QueryExamParams = z.infer<typeof QueryExamSchema>;
export type ExamDetailResponse = z.infer<typeof ExamDetailSchema>;
export type AddQuestionToExamRequest = z.infer<typeof AddQuestionToExamSchema>;
export type AddQuestionsToExamRequest = z.infer<
  typeof AddQuestionsToExamSchema
>;
export type ExamStatsResponse = z.infer<typeof ExamStatsSchema>;
