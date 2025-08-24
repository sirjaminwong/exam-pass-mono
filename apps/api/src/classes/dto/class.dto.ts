import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  PaginationSchema,
  SortSchema,
  SearchSchema,
} from '../../common/utils/zod';

// ============= Class Schemas =============

/**
 * 创建班级 Schema
 */
export const CreateClassSchema = z.object({
  name: z.string().min(1).describe('班级名称'),
  code: z.string().min(1).describe('班级代码'),
  teacherId: cuidString().optional().describe('教师ID'),
});

/**
 * 更新班级 Schema
 */
export const UpdateClassSchema = z.object({
  name: z.string().min(1).optional().describe('班级名称'),
  code: z.string().min(1).optional().describe('班级代码'),
  teacherId: cuidString().optional().describe('教师ID'),
});

/**
 * 查询班级 Schema
 */
export const QueryClassesSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      teacherId: cuidString().optional().describe('按教师ID筛选'),
      hasMembers: z
        .string()
        .optional()
        .transform((val) => {
          if (val === undefined) return undefined;
          return val === 'true';
        })
        .pipe(z.boolean().optional())
        .describe('是否有成员'),
    }),
  );

/**
 * 添加班级成员 Schema
 */
export const AddClassMemberSchema = z.object({
  userId: cuidString().describe('用户ID'),
});

/**
 * 班级统计查询 Schema
 */
export const ClassStatsQuerySchema = z.object({
  teacherId: cuidString().optional().describe('教师ID，不传则统计所有班级'),
});

/**
 * 用户信息 Schema（用于关联查询）
 */
export const UserInfoSchema = z.object({
  id: cuidString().describe('用户ID'),
  name: z.string().describe('用户姓名'),
  email: z.string().email().describe('用户邮箱'),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).describe('用户角色'),
});

/**
 * 班级成员信息 Schema（用于关联查询）
 */
export const ClassMemberInfoSchema = z.object({
  id: cuidString().describe('班级成员记录ID'),
  userId: cuidString().describe('用户ID'),
  joinedAt: dateString().describe('加入时间'),
  user: UserInfoSchema.describe('用户信息'),
});

/**
 * 考试信息 Schema（用于关联查询）
 */
export const ExamInfoSchema = z.object({
  id: cuidString().describe('考试ID'),
  title: z.string().describe('考试标题'),
  description: z.string().nullable().describe('考试描述'),
  isActive: z.boolean().describe('是否激活'),
  createdAt: dateString().describe('创建时间'),
});

/**
 * 班级基础信息 Schema
 */
export const ClassSchema = z.object({
  id: cuidString().describe('班级ID'),
  name: z.string().describe('班级名称'),
  code: z.string().describe('班级代码'),
  teacherId: cuidString().nullable().describe('教师ID'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
});

/**
 * 班级详细信息 Schema（包含关联信息）
 */
export const ClassDetailSchema = ClassSchema.extend({
  members: z.array(ClassMemberInfoSchema).describe('班级成员列表'),
  exams: z.array(ExamInfoSchema).describe('考试列表'),
});

/**
 * 班级统计信息 Schema
 */
export const ClassStatsSchema = z.object({
  totalClasses: z.number().describe('总班级数'),
  totalMembers: z.number().describe('总成员数'),
  totalExams: z.number().describe('总考试数'),
  activeExams: z.number().describe('活跃考试数'),
});

// ============= DTO Classes =============

/**
 * 创建班级 DTO
 */
export class CreateClassDto extends createZodDto(CreateClassSchema) {}

/**
 * 更新班级 DTO
 */
export class UpdateClassDto extends createZodDto(UpdateClassSchema) {}

/**
 * 查询班级 DTO
 */
export class QueryClassesDto extends createZodDto(QueryClassesSchema) {}

/**
 * 添加班级成员 DTO
 */
export class AddClassMemberDto extends createZodDto(AddClassMemberSchema) {}

/**
 * 班级统计查询 DTO
 */
export class ClassStatsQueryDto extends createZodDto(ClassStatsQuerySchema) {}

/**
 * 班级基础信息 DTO
 */
export class ClassDto extends createZodDto(ClassSchema) {}

/**
 * 班级详细信息 DTO
 */
export class ClassDetailDto extends createZodDto(ClassDetailSchema) {}

/**
 * 班级统计信息 DTO
 */
export class ClassStatsDto extends createZodDto(ClassStatsSchema) {}

// ============= Type Exports =============

export type CreateClassRequest = z.infer<typeof CreateClassSchema>;
export type UpdateClassRequest = z.infer<typeof UpdateClassSchema>;
export type QueryClassesParams = z.infer<typeof QueryClassesSchema>;
export type AddClassMemberRequest = z.infer<typeof AddClassMemberSchema>;
export type ClassStatsQueryParams = z.infer<typeof ClassStatsQuerySchema>;
export type ClassResponse = z.infer<typeof ClassSchema>;
export type ClassDetailResponse = z.infer<typeof ClassDetailSchema>;
export type ClassStatsResponse = z.infer<typeof ClassStatsSchema>;
