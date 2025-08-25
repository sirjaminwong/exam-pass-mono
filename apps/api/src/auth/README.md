# JWT 认证系统使用指南

本文档介绍如何使用考试通过系统的 JWT 认证功能。

## 功能概述

- 用户注册和登录
- JWT 访问令牌和刷新令牌
- 基于角色的访问控制 (RBAC)
- 密码修改
- 用户信息获取

## 用户角色

系统支持三种用户角色：

- `STUDENT`: 学生用户，基础权限
- `TEACHER`: 教师用户，中级权限
- `ADMIN`: 管理员用户，最高权限

## API 端点

### 1. 用户注册

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "张三",
  "password": "password123",
  "role": "STUDENT"
}
```

**响应示例：**
```json
{
  "user": {
    "id": "clxxxxx",
    "email": "user@example.com",
    "name": "张三",
    "role": "STUDENT",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "tokens": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900,
    "tokenType": "Bearer"
  }
}
```

### 2. 用户登录

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**响应格式与注册相同**

### 3. 刷新访问令牌

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应示例：**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 900,
  "tokenType": "Bearer"
}
```

### 4. 获取用户信息

```http
GET /auth/profile
Authorization: Bearer <access_token>
```

**响应示例：**
```json
{
  "id": "clxxxxx",
  "email": "user@example.com",
  "name": "张三",
  "role": "STUDENT",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 5. 修改密码

```http
PATCH /auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

**响应示例：**
```json
{
  "message": "密码修改成功"
}
```

### 6. 用户登出

```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**响应示例：**
```json
{
  "message": "登出成功"
}
```

## 权限保护的 API 使用

### 用户管理 API

所有用户管理 API 都需要 JWT 认证：

```http
GET /users
Authorization: Bearer <access_token>
```

**权限要求：**
- 获取用户列表：`ADMIN` 或 `TEACHER`
- 创建用户：`ADMIN`
- 更新用户：`ADMIN`
- 删除用户：`ADMIN`

## 在代码中使用认证

### 1. 保护控制器

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { Roles, CurrentUser } from '../auth/decorators';
import { UserProfile } from '../auth/dto/auth.dto';

@Controller('protected')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProtectedController {
  
  @Get('admin-only')
  @Roles('ADMIN')
  adminOnlyEndpoint(@CurrentUser() user: UserProfile) {
    return { message: `Hello ${user.name}, you are an admin!` };
  }
  
  @Get('teacher-or-admin')
  @Roles('TEACHER', 'ADMIN')
  teacherOrAdminEndpoint(@CurrentUser() user: UserProfile) {
    return { message: `Hello ${user.name}, you have elevated privileges!` };
  }
  
  @Get('authenticated-only')
  authenticatedOnlyEndpoint(@CurrentUser() user: UserProfile) {
    return { message: `Hello ${user.name}, you are authenticated!` };
  }
}
```

### 2. 获取当前用户信息

使用 `@CurrentUser()` 装饰器获取当前登录用户的信息：

```typescript
@Get('my-data')
@UseGuards(JwtAuthGuard)
getMyData(@CurrentUser() user: UserProfile) {
  // user 包含当前登录用户的完整信息
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}
```

## 环境变量配置

在 `.env` 文件中配置以下环境变量：

```env
# JWT 配置
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

## 错误处理

### 常见错误响应

**401 Unauthorized - 未授权**
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**403 Forbidden - 权限不足**
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

**400 Bad Request - 请求参数错误**
```json
{
  "statusCode": 400,
  "message": [
    "email must be a valid email",
    "password must be at least 6 characters"
  ],
  "error": "Bad Request"
}
```

## 安全最佳实践

1. **令牌存储**：在客户端安全存储访问令牌，建议使用 httpOnly cookies 或安全的本地存储

2. **令牌刷新**：访问令牌过期时使用刷新令牌获取新的访问令牌

3. **HTTPS**：生产环境中始终使用 HTTPS

4. **密码强度**：确保用户使用强密码（至少 6 位字符）

5. **环境变量**：妥善保管 JWT 密钥，不要将其提交到代码仓库

## 前端集成示例

### JavaScript/TypeScript

```typescript
class AuthService {
  private baseUrl = 'http://localhost:3000';
  private accessToken: string | null = null;
  
  async login(email: string, password: string) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      this.accessToken = data.tokens.accessToken;
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      return data;
    }
    
    throw new Error('Login failed');
  }
  
  async makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });
  }
  
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    if (response.ok) {
      const data = await response.json();
      this.accessToken = data.accessToken;
      localStorage.setItem('refreshToken', data.refreshToken);
      return data;
    }
    
    throw new Error('Token refresh failed');
  }
}
```

## 故障排除

### 常见问题

1. **Token 验证失败**
   - 检查 JWT_SECRET 环境变量是否正确设置
   - 确认令牌格式正确（Bearer token）
   - 检查令牌是否已过期

2. **权限被拒绝**
   - 确认用户角色是否满足 API 要求
   - 检查 @Roles 装饰器配置
   - 确认 RolesGuard 已正确应用

3. **用户注册失败**
   - 检查邮箱格式是否正确
   - 确认密码长度至少 6 位
   - 检查用户是否已存在

如有其他问题，请查看服务器日志或联系开发团队。