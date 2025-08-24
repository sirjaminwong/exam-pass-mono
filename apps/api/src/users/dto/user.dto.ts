import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  emailString,
  passwordString,
  UserRoleEnum,
} from '../../common/utils/zod';

// ============= User Schemas =============

/**
 * 创建用户 Schema
 */
export const CreateUserSchema = z.object({
  email: emailString().describe('用户邮箱'),
  name: z
    .string({ message: '用户姓名不能为空' })
    .min(1, { message: '用户姓名不能为空' })
    .max(50, { message: '用户姓名不能超过50个字符' })
    .describe('用户姓名'),
  password: passwordString().describe('用户密码'),
  role: UserRoleEnum.optional().default('STUDENT').describe('用户角色'),
});

/**
 * 更新用户 Schema
 */
export const UpdateUserSchema = z.object({
  email: emailString().optional().describe('用户邮箱'),
  name: z
    .string()
    .min(1, { message: '用户姓名不能为空' })
    .max(50, { message: '用户姓名不能超过50个字符' })
    .optional()
    .describe('用户姓名'),
  password: passwordString().optional().describe('用户密码'),
  role: UserRoleEnum.optional().describe('用户角色'),
});

/**
 * 用户响应 Schema
 */
export const UserSchema = z.object({
  id: cuidString().describe('用户ID'),
  email: z.string().describe('用户邮箱'),
  name: z.string().describe('用户姓名'),
  role: UserRoleEnum.describe('用户角色'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
});

/**
 * 用户查询 Schema
 */
export const QueryUserSchema = z.object({
  email: z.string().optional().describe('按邮箱筛选'),
  name: z.string().optional().describe('按姓名筛选'),
  role: UserRoleEnum.optional().describe('按角色筛选'),
  search: z.string().optional().describe('搜索关键词（姓名或邮箱）'),
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
 * 用户登录 Schema
 */
export const LoginUserSchema = z.object({
  email: emailString().describe('用户邮箱'),
  password: z.string({ message: '密码不能为空' }).describe('用户密码'),
});

/**
 * 修改密码 Schema
 */
export const ChangePasswordSchema = z.object({
  oldPassword: z.string({ message: '原密码不能为空' }).describe('原密码'),
  newPassword: passwordString().describe('新密码'),
});

// ============= DTO Classes =============

/**
 * 创建用户 DTO
 */
export class CreateUserDto extends createZodDto(CreateUserSchema) {}

/**
 * 更新用户 DTO
 */
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}

/**
 * 用户响应 DTO
 */
export class UserDto extends createZodDto(UserSchema) {}

/**
 * 用户查询 DTO
 */
export class QueryUserDto extends createZodDto(QueryUserSchema) {}

/**
 * 用户登录 DTO
 */
export class LoginUserDto extends createZodDto(LoginUserSchema) {}

/**
 * 修改密码 DTO
 */
export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}

// ============= Type Exports =============

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserSchema>;
export type QueryUserParams = z.infer<typeof QueryUserSchema>;
export type LoginUserRequest = z.infer<typeof LoginUserSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
