import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { cuidString, dateString } from '../../common/utils/zod';

// ============= ClassMember Schemas =============

/**
 * 创建班级成员 Schema
 */
export const CreateClassMemberSchema = z.object({
  userId: cuidString().describe('用户ID'),
  classId: cuidString().describe('班级ID'),
});

/**
 * 更新班级成员 Schema
 */
export const UpdateClassMemberSchema = z.object({
  userId: cuidString().optional().describe('用户ID'),
  classId: cuidString().optional().describe('班级ID'),
});

/**
 * 查询班级成员 Schema
 */
export const QueryClassMembersSchema = z.object({
  userId: cuidString().optional().describe('按用户ID筛选'),
  classId: cuidString().optional().describe('按班级ID筛选'),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1))
    .describe('页码，默认为 1'),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().min(1).max(100))
    .describe('每页数量，默认为 10，最大 100'),
});

/**
 * 添加班级成员 Schema
 */
export const AddClassMemberSchema = z.object({
  userId: cuidString().describe('用户ID'),
  classId: cuidString().describe('班级ID'),
});

/**
 * 批量添加班级成员 Schema
 */
export const BatchAddClassMembersSchema = z.object({
  userIds: z.array(cuidString()).min(1).describe('用户ID列表'),
  classId: cuidString().describe('班级ID'),
});

/**
 * 批量删除班级成员 Schema
 */
export const BatchRemoveClassMembersSchema = z.object({
  userIds: z.array(cuidString()).min(1).describe('用户ID列表'),
  classId: cuidString().describe('班级ID'),
});

/**
 * 班级成员统计查询 Schema
 */
export const ClassMemberStatsQuerySchema = z.object({
  classId: cuidString().optional().describe('班级ID，不传则统计所有班级'),
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
 * 班级信息 Schema（用于关联查询）
 */
export const ClassInfoSchema = z.object({
  id: cuidString().describe('班级ID'),
  name: z.string().describe('班级名称'),
  code: z.string().describe('班级代码'),
});

/**
 * 班级成员基础信息 Schema
 */
export const ClassMemberSchema = z.object({
  id: cuidString().describe('班级成员记录ID'),
  userId: cuidString().describe('用户ID'),
  classId: cuidString().describe('班级ID'),
  joinedAt: dateString().describe('加入时间'),
});

/**
 * 班级成员详细信息 Schema（包含关联信息）
 */
export const ClassMemberDetailSchema = ClassMemberSchema.extend({
  user: UserInfoSchema.describe('用户信息'),
  class: ClassInfoSchema.describe('班级信息'),
});

/**
 * 班级成员统计信息 Schema
 */
export const ClassMemberStatsSchema = z.object({
  totalMembers: z.number().describe('总成员数'),
  membersByClass: z
    .record(z.string(), z.number())
    .describe('按班级分组的成员数'),
});

// ============= DTO Classes =============

/**
 * 创建班级成员 DTO
 */
export class CreateClassMemberDto extends createZodDto(
  CreateClassMemberSchema,
) {}

/**
 * 更新班级成员 DTO
 */
export class UpdateClassMemberDto extends createZodDto(
  UpdateClassMemberSchema,
) {}

/**
 * 查询班级成员 DTO
 */
export class QueryClassMembersDto extends createZodDto(
  QueryClassMembersSchema,
) {}

/**
 * 添加班级成员 DTO
 */
export class AddClassMemberDto extends createZodDto(AddClassMemberSchema) {}

/**
 * 批量添加班级成员 DTO
 */
export class BatchAddClassMembersDto extends createZodDto(
  BatchAddClassMembersSchema,
) {}

/**
 * 批量删除班级成员 DTO
 */
export class BatchRemoveClassMembersDto extends createZodDto(
  BatchRemoveClassMembersSchema,
) {}

/**
 * 班级成员统计查询 DTO
 */
export class ClassMemberStatsQueryDto extends createZodDto(
  ClassMemberStatsQuerySchema,
) {}

/**
 * 班级成员基础信息 DTO
 */
export class ClassMemberDto extends createZodDto(ClassMemberSchema) {}

/**
 * 班级成员详细信息 DTO
 */
export class ClassMemberDetailDto extends createZodDto(
  ClassMemberDetailSchema,
) {}

/**
 * 班级成员统计信息 DTO
 */
export class ClassMemberStatsDto extends createZodDto(ClassMemberStatsSchema) {}

// ============= Type Exports =============

export type CreateClassMember = z.infer<typeof CreateClassMemberSchema>;
export type UpdateClassMember = z.infer<typeof UpdateClassMemberSchema>;
export type QueryClassMembers = z.infer<typeof QueryClassMembersSchema>;
export type AddClassMember = z.infer<typeof AddClassMemberSchema>;
export type BatchAddClassMembers = z.infer<typeof BatchAddClassMembersSchema>;
export type BatchRemoveClassMembers = z.infer<
  typeof BatchRemoveClassMembersSchema
>;
export type ClassMemberStatsQuery = z.infer<typeof ClassMemberStatsQuerySchema>;
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type ClassInfo = z.infer<typeof ClassInfoSchema>;
export type ClassMember = z.infer<typeof ClassMemberSchema>;
export type ClassMemberDetail = z.infer<typeof ClassMemberDetailSchema>;
export type ClassMemberStats = z.infer<typeof ClassMemberStatsSchema>;
