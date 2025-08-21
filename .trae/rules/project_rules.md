# Exam Pass Mono - 项目规则

## 项目概述

这是一个考试通过系统的 monorepo 项目，使用 pnpm workspace 和 Turbo 进行管理。

### 技术栈

- **包管理器**: pnpm (v10.14.0)
- **构建工具**: Turbo
- **API**: NestJS + Prisma + TypeScript
- **Web**: Next.js 15 + React 19 + TypeScript + Tailwind CSS

## 项目结构

```
exam-pass-mono/
├── apps/
│   ├── api/          # NestJS 后端 API
│   └── web/          # Next.js 前端应用
├── packages/         # 共享包
├── .trae/           # Trae AI 配置
└── turbo/           # Turbo 生成器模板
```

## 开发规范

### 代码规范

1. **TypeScript**: 所有代码必须使用 TypeScript
2. **ESLint**: 遵循项目配置的 ESLint 规则
3. **Prettier**: 使用 Prettier 进行代码格式化
4. **类型检查**: 提交前必须通过 `pnpm type-check`

### 命名规范

1. **文件命名**: 使用 kebab-case (例: `user-service.ts`)
2. **组件命名**: 使用 PascalCase (例: `UserProfile.tsx`)
3. **变量/函数**: 使用 camelCase (例: `getUserData`)
4. **常量**: 使用 UPPER_SNAKE_CASE (例: `API_BASE_URL`)

### Git 规范

1. **分支命名**: `feature/功能名`, `fix/修复名`, `docs/文档更新`
2. **提交信息**: 使用语义化提交格式
   - `feat: 新功能`
   - `fix: 修复bug`
   - `docs: 文档更新`
   - `style: 代码格式调整`
   - `refactor: 重构`
   - `test: 测试相关`

## 开发流程

### 环境设置

```bash
# 安装依赖
pnpm install

# 生成 Prisma 客户端
pnpm generate

# 启动开发服务器
pnpm dev
```

### 常用命令

```bash
# 开发模式
pnpm dev              # 启动所有应用
pnpm dev --filter=api # 仅启动 API
pnpm dev --filter=web # 仅启动 Web

# 构建
pnpm build            # 构建所有应用

# 代码检查
pnpm lint             # ESLint 检查
pnpm type-check       # TypeScript 类型检查

# 代码生成
pnpm generate         # 生成 Prisma 客户端和 API 类型
```

### 端口分配

- **API**: 默认端口 (通常 3000)
- **Web**: 3002

## API 开发规范

### 目录结构

```
src/
├── app.module.ts     # 主模块
├── main.ts          # 应用入口
├── prisma/          # Prisma 配置
└── users/           # 用户模块示例
    ├── dto/
    │   └── user.dto.ts      # DTO 定义文件
    ├── users.controller.ts  # 控制器（含 Swagger 注解）
    ├── users.service.ts     # 服务层
    └── users.module.ts      # 模块定义
```

### 开发规范

1. **模块化**: 按功能划分模块
2. **依赖注入**: 使用 NestJS 的依赖注入系统
3. **数据库**: 使用 Prisma ORM
4. **API 文档**: 使用 Swagger 自动生成文档
5. **测试**: 编写单元测试和集成测试

### DTO 和数据验证规范

#### 1. Schema 定义规范

使用 Zod 定义数据验证 Schema，遵循以下命名规范：

- **创建操作**: `Create{Entity}Schema`
- **更新操作**: `Update{Entity}Schema`
- **查询操作**: `Query{Entity}Schema`
- **响应数据**: `{Entity}Schema`
- **统计数据**: `{Entity}StatsSchema`

```typescript
// 示例：创建用户 Schema
export const CreateUserSchema = z.object({
  email: emailString().describe('用户邮箱'),
  password: passwordString().describe('用户密码'),
  name: z.string().min(1).describe('用户姓名'),
});
```

#### 2. DTO 类定义规范

使用 `nestjs-zod` 的 `createZodDto` 从 Schema 生成 DTO 类：

```typescript
// DTO 类命名规范
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
export class UserDto extends createZodDto(UserSchema) {}
```

#### 3. Type 导出规范

为每个 Schema 导出对应的 TypeScript 类型：

```typescript
// Type 导出命名规范
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type User = z.infer<typeof UserSchema>;
```

#### 4. 通用验证器使用

项目提供了通用的验证器，应优先使用：

```typescript
import {
  cuidString,     // CUID 格式验证
  dateString,     // ISO 8601 日期验证
  scoreNumber,    // 分数验证（≥0）
  emailString,    // 邮箱格式验证
  passwordString, // 密码强度验证
} from '../common/utils/zod';
```

#### 5. 分页和查询参数

使用预定义的分页和查询 Schema：

```typescript
import {
  PaginationSchema,  // 分页参数
  SortSchema,        // 排序参数
  SearchSchema,      // 搜索参数
} from '../common/utils/zod';

// 组合查询参数
export const QueryUserSchema = PaginationSchema
  .merge(SortSchema)
  .merge(SearchSchema)
  .merge(z.object({
    // 特定查询字段
    role: z.enum(['admin', 'user']).optional(),
    isActive: z.boolean().optional(),
  }));
```

#### 6. JSON 字段处理

对于存储 JSON 数据的字段，使用专用验证器：

```typescript
import { jsonField, optionalJsonField } from '../common/utils/zod';

// 必需的 JSON 字段
metadata: jsonField(MetadataSchema),

// 可选的 JSON 字段
settings: optionalJsonField(SettingsSchema),
```

#### 7. 数据转换规范

查询参数通常以字符串形式传递，需要转换：

```typescript
// 字符串到数字转换
page: z
  .string()
  .optional()
  .transform((val) => (val ? parseInt(val, 10) : 1))
  .pipe(z.number().min(1))
  .describe('页码，默认为 1'),

// 布尔值转换
isActive: z
  .string()
  .optional()
  .transform((val) => {
    if (val === undefined) return undefined;
    return val === 'true';
  })
  .pipe(z.boolean().optional())
  .describe('按激活状态筛选'),
```

### Swagger 注解规范

#### 1. 控制器级别注解

```typescript
@ApiTags('users')  // API 分组标签
@Controller('users')
export class UsersController {
  // ...
}
```

#### 2. 方法级别注解

每个 API 端点必须包含以下注解：

```typescript
@Post()
@ApiOperation({ summary: '创建新用户' })  // 操作描述
@ApiResponse({
  status: 201,
  description: '用户创建成功',
  type: UserDto,  // 响应类型
})
@ApiResponse({ status: 400, description: '请求参数错误' })  // 错误响应
@ApiResponse({ status: 409, description: '用户已存在' })
create(@Body() createUserDto: CreateUserDto): Promise<User> {
  // 实现逻辑
}
```

#### 3. 参数注解规范

- **路径参数**: 使用 `@ApiParam`
- **查询参数**: 通过 DTO 自动生成文档
- **请求体**: 通过 DTO 自动生成文档

```typescript
@Get(':id')
@ApiParam({ name: 'id', description: '用户ID' })
@ApiResponse({
  status: 200,
  description: '成功获取用户详情',
  type: UserDto,
})
@ApiResponse({ status: 404, description: '用户不存在' })
findOne(@Param('id') id: string): Promise<User | null> {
  // 实现逻辑
}
```

#### 4. 文档描述规范

**Schema 字段描述**：每个字段都应该有清晰的中文描述

```typescript
email: emailString().describe('用户邮箱'),
password: passwordString().describe('用户密码'),
name: z.string().min(1).describe('用户姓名'),
```

**API 操作描述**：使用动词开头的简洁描述

```typescript
@ApiOperation({ summary: '创建新用户' })
@ApiOperation({ summary: '获取用户列表' })
@ApiOperation({ summary: '更新用户信息' })
@ApiOperation({ summary: '删除用户' })
```

**响应描述**：描述操作结果和可能的错误

```typescript
@ApiResponse({ status: 201, description: '用户创建成功', type: UserDto })
@ApiResponse({ status: 400, description: '请求参数错误' })
@ApiResponse({ status: 404, description: '用户不存在' })
@ApiResponse({ status: 409, description: '用户已存在' })
```

### 代码组织规范

#### 1. DTO 文件结构

DTO 文件应按以下顺序组织：

```typescript
// 1. 导入语句
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { cuidString, emailString } from '../common/utils/zod';

// 2. Schema 定义（按功能分组）
// ============= User Schemas =============

// 3. DTO 类定义
// ============= DTO Classes =============

// 4. 类型导出
// ============= Type Exports =============
```

#### 2. 注释规范

使用 JSDoc 风格的注释：

```typescript
/**
 * 创建用户 Schema
 */
export const CreateUserSchema = z.object({
  // 字段定义
});

/**
 * 创建用户 DTO
 */
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
```

### 最佳实践

1. **类型安全**
   - 始终使用 TypeScript 类型
   - 利用 Zod 的类型推断
   - 避免使用 `any` 类型

2. **验证完整性**
   - 为所有输入数据定义验证规则
   - 使用适当的错误消息
   - 考虑边界情况

3. **文档完整性**
   - 每个 API 端点都有完整的 Swagger 文档
   - 包含所有可能的响应状态码
   - 提供清晰的参数描述

4. **一致性**
   - 遵循统一的命名规范
   - 使用相同的验证器
   - 保持代码风格一致

## Web 开发规范

### 目录结构

```
src/
├── app/             # Next.js App Router
│   ├── layout.tsx   # 根布局
│   └── page.tsx     # 首页
└── lib/             # 工具库
    ├── api.ts       # API 客户端
    ├── utils.ts     # 工具函数
    └── model/       # 类型定义
```

### 开发规范

1. **组件**: 使用函数式组件和 React Hooks
2. **样式**: 使用 Tailwind CSS
3. **状态管理**: 根据需要选择合适的状态管理方案
4. **API 调用**: 使用 Orval 生成的类型安全客户端
5. **路由**: 使用 Next.js App Router

## 部署规范

### 构建检查

部署前必须确保：

1. 所有测试通过
2. 类型检查通过
3. ESLint 检查通过
4. 构建成功

### 环境变量

- 使用 `.env.local` 文件管理本地环境变量
- 生产环境变量通过部署平台配置
- 敏感信息不得提交到代码仓库

## 注意事项

1. **依赖管理**: 使用 pnpm，不要使用 npm 或 yarn
2. **版本控制**: 遵循语义化版本控制
3. **安全**: 注意 API 安全，实施适当的认证和授权
4. **性能**: 关注应用性能，定期进行性能优化
5. **文档**: 及时更新项目文档和 API 文档

## 故障排除

### 常见问题

1. **依赖安装失败**: 删除 `node_modules` 和 `pnpm-lock.yaml`，重新安装
2. **类型错误**: 运行 `pnpm generate` 重新生成类型
3. **端口冲突**: 检查端口占用，修改配置文件中的端口设置
4. **构建失败**: 检查 TypeScript 错误和依赖问题

### 获取帮助

- 查看项目 README 文件
- 检查相关技术栈的官方文档
- 向团队成员寻求帮助