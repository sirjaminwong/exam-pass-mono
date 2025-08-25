import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  cuidString,
  dateString,
  emailString,
  passwordString,
  UserRoleEnum,
} from '../../common/utils/zod';

// ============= Auth Schemas =============

/**
 * 登录请求 Schema
 */
export const LoginSchema = z.object({
  email: emailString().describe('用户邮箱'),
  password: z.string({ message: '密码不能为空' }).describe('用户密码'),
});

/**
 * 注册请求 Schema
 */
export const RegisterSchema = z.object({
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
 * 刷新Token请求 Schema
 */
export const RefreshTokenSchema = z.object({
  refreshToken: z.string({ message: '刷新令牌不能为空' }).describe('刷新令牌'),
});

/**
 * 修改密码请求 Schema
 */
export const ChangePasswordSchema = z.object({
  oldPassword: z.string({ message: '原密码不能为空' }).describe('原密码'),
  newPassword: passwordString().describe('新密码'),
});

/**
 * Token响应 Schema
 */
export const TokenResponseSchema = z.object({
  accessToken: z.string().describe('访问令牌'),
  refreshToken: z.string().describe('刷新令牌'),
  expiresIn: z.number().describe('访问令牌过期时间（秒）'),
  tokenType: z.string().default('Bearer').describe('令牌类型'),
});

/**
 * 登录响应 Schema
 */
export const LoginResponseSchema = z.object({
  user: z
    .object({
      id: cuidString().describe('用户ID'),
      email: z.string().describe('用户邮箱'),
      name: z.string().describe('用户姓名'),
      role: UserRoleEnum.describe('用户角色'),
      createdAt: dateString().describe('创建时间'),
      updatedAt: dateString().describe('更新时间'),
    })
    .describe('用户信息'),
  tokens: TokenResponseSchema.describe('令牌信息'),
});

/**
 * JWT载荷 Schema
 */
export const JwtPayloadSchema = z.object({
  sub: cuidString().describe('用户ID'),
  email: z.string().describe('用户邮箱'),
  role: UserRoleEnum.describe('用户角色'),
  iat: z.number().optional().describe('签发时间'),
  exp: z.number().optional().describe('过期时间'),
});

/**
 * 用户信息响应 Schema
 */
export const UserProfileSchema = z.object({
  id: cuidString().describe('用户ID'),
  email: z.string().describe('用户邮箱'),
  name: z.string().describe('用户姓名'),
  role: UserRoleEnum.describe('用户角色'),
  createdAt: dateString().describe('创建时间'),
  updatedAt: dateString().describe('更新时间'),
});

// ============= DTO Classes =============

/**
 * 登录请求 DTO
 */
export class LoginDto extends createZodDto(LoginSchema) {}

/**
 * 注册请求 DTO
 */
export class RegisterDto extends createZodDto(RegisterSchema) {}

/**
 * 刷新Token请求 DTO
 */
export class RefreshTokenDto extends createZodDto(RefreshTokenSchema) {}

/**
 * 修改密码请求 DTO
 */
export class ChangePasswordDto extends createZodDto(ChangePasswordSchema) {}

/**
 * Token响应 DTO
 */
export class TokenResponseDto extends createZodDto(TokenResponseSchema) {}

/**
 * 登录响应 DTO
 */
export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}

/**
 * JWT载荷 DTO
 */
export class JwtPayloadDto extends createZodDto(JwtPayloadSchema) {}

/**
 * 用户信息响应 DTO
 */
export class UserProfileDto extends createZodDto(UserProfileSchema) {}

// ============= Type Exports =============

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenSchema>;
export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>;
export type TokenResponse = z.infer<typeof TokenResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type JwtPayload = z.infer<typeof JwtPayloadSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
