#### 2. DTO 类定义规范

使用 `nestjs-zod` 的 `createZodDto` 从 Schema 生成 DTO 类：

```typescript
// DTO 类命名规范
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
export class UserDto extends createZodDto(UserSchema) {}
```

#### 3. Type 导出规范

为每个 Schema 导出对应的 TypeScript 类型，使用语义化命名避免与 Prisma 类型冲突：

```typescript
// Type 导出命名规范 - 使用语义化后缀
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type UserResponse = z.infer<typeof UserSchema>;
export type QueryUserParams = z.infer<typeof QueryUserSchema>;
export type UserStatsResponse = z.infer<typeof UserStatsSchema>;
```

**命名规范说明**：
- **请求类型**：使用 `Request` 后缀（如 `CreateUserRequest`、`UpdateUserRequest`）
- **响应类型**：使用 `Response` 后缀（如 `UserResponse`、`UserStatsResponse`）
- **查询参数**：使用 `Params` 后缀（如 `QueryUserParams`、`FilterUserParams`）

**优势**：
- 避免与 Prisma Client 导出的类型命名冲突
- 语义清晰，明确表达类型用途
- 符合 REST API 最佳实践
- 便于团队理解和代码维护

#### 4. 通用验证器使用

项目提供了通用的验证器，应优先使用：

```typescript
import {
  cuidString, // CUID 格式验证
  dateString, // ISO 8601 日期验证
  scoreNumber, // 分数验证（≥0）
  emailString, // 邮箱格式验证
  passwordString, // 密码强度验证
} from "../common/utils/zod";
```

#### 5. 分页和查询参数

使用预定义的分页和查询 Schema：

```typescript
import {
  PaginationSchema, // 分页参数
  SortSchema, // 排序参数
  SearchSchema, // 搜索参数
} from "../common/utils/zod";

// 组合查询参数
export const QueryUserSchema = PaginationSchema.merge(SortSchema)
  .merge(SearchSchema)
  .merge(
    z.object({
      // 特定查询字段
      role: z.enum(["admin", "user"]).optional(),
      isActive: z.boolean().optional(),
    })
  );
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
@ApiTags("users") // API 分组标签
@Controller("users")
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
import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { cuidString, emailString } from "../common/utils/zod";

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

#### 8. 类型推断最佳实践

**Service 层类型推断策略**：

1. **简单返回类型**：完全依赖类型推断
```typescript
// ✅ 推荐：让 TypeScript 自动推断
async findUser(id: string) {
  return this.prisma.user.findUnique({ where: { id } });
}
```

2. **复杂查询结果**：利用 Prisma 的类型推断
```typescript
// ✅ 推荐：Prisma 自动推断包含关联的复杂类型
async getUserWithPosts(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
    include: { posts: true }
  });
}
```

3. **需要转换的数据**：明确中间步骤类型
```typescript
// ✅ 推荐：转换逻辑清晰，最终返回类型自动推断
async getFormattedUser(id: string) {
  const user = await this.prisma.user.findUnique({ where: { id } });
  if (!user) return null;
  
  return {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    isActive: user.status === 'ACTIVE'
  };
}
```

4. **何时显式声明返回类型**：
   - 返回类型过于复杂，影响代码可读性
   - 需要强制类型约束，防止意外返回
   - 公共 API 方法，需要明确接口契约

```typescript
// ✅ 特殊情况：复杂返回类型需要明确声明
async getComplexReport(params: ReportParams): Promise<ComplexReportResult> {
  // 复杂的数据处理逻辑
  return complexResult;
}
```

### 分层架构中的 DTO 和 Type 使用规范

#### 1. 层级职责划分

**Controller 层**：

- 使用 DTO 进行数据验证和文档生成
- 负责 HTTP 请求/响应的处理
- 提供 Swagger API 文档

**Service 层**：

- **必须使用 Type** 专注于业务逻辑
- 避免与 HTTP 层耦合
- 提高代码的可测试性和复用性
- **禁止直接使用 DTO 类作为参数类型**

#### 2. 数据传递策略

**方式一：DTO 转换为 Type**

```typescript
// Controller 层
@Post()
create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
  // 将 DTO 转换为 Type
  const userData: CreateUserRequest = {
    email: createUserDto.email,
    password: createUserDto.password,
    name: createUserDto.name,
  };
  return this.usersService.create(userData);
}

// Service 层
class UsersService {
  async create(data: CreateUserRequest): Promise<UserResponse> {
    // 专注于业务逻辑，不依赖 HTTP 层
    return this.prisma.user.create({ data });
  }
}
```

**方式二：利用类型兼容性直接传递（推荐）**

```typescript
// Controller 层
@Post()
create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
  // 直接传递 DTO，利用 TypeScript 的结构化类型系统
  // Service 层方法参数使用 Type，但可以接收 DTO 实例
  return this.usersService.create(createUserDto);
}

// Service 层
class UsersService {
  async create(data: CreateUserRequest): Promise<UserResponse> {
    // 参数类型必须是 Type，不是 DTO 类
    // TypeScript 会自动进行类型兼容性检查
    return this.prisma.user.create({ data });
  }
}
```

#### 3. DTO 文件组织最佳实践

在 DTO 文件中同时导出 DTO 和 Type：

```typescript
// user.dto.ts
import { z } from "zod";
import { createZodDto } from "nestjs-zod";
import { emailString, passwordString } from "../common/utils/zod";

// Schema 定义
export const CreateUserSchema = z.object({
  email: emailString().describe("用户邮箱"),
  password: passwordString().describe("用户密码"),
  name: z.string().min(1).describe("用户姓名"),
});

export const UserSchema = z.object({
  id: z.string().describe("用户ID"),
  email: emailString().describe("用户邮箱"),
  name: z.string().describe("用户姓名"),
  createdAt: z.date().describe("创建时间"),
});

// DTO 类（用于 Controller 层）
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class UserDto extends createZodDto(UserSchema) {}

// Type 导出（用于 Service 层）- 使用语义化命名
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UserResponse = z.infer<typeof UserSchema>;
```

#### 4. 使用场景指导

**使用 DTO 的场景**：

- Controller 层的参数验证
- Swagger 文档生成
- HTTP 请求/响应处理
- 需要运行时验证的场景

**使用 Type 的场景**：

- Service 层的业务逻辑
- 内部方法参数
- 数据库操作
- 单元测试
- 需要高性能的场景

#### 5. 优势对比

**DTO 的优势**：

- 运行时数据验证
- 自动生成 Swagger 文档
- 装饰器支持
- 错误信息定制
- 与 NestJS 框架深度集成

**Type 的优势**：

- 编译时类型检查
- 更轻量，无运行时开销
- 更好的解耦性
- 更适合纯业务逻辑
- 更容易进行单元测试

#### 6. 强制性使用策略

**Controller 层规范**：
- **参数验证**：必须使用 DTO 进行数据验证和文档生成
- **返回类型**：必须显式声明 DTO 返回类型，确保 API 契约清晰
- **响应格式**：统一使用 DTO 格式返回数据

```typescript
// ✅ 正确：显式声明返回类型
@Get(':id')
findOne(@Param('id') id: string): Promise<UserDto> {
  return this.usersService.findOne(id);
}

// ❌ 错误：缺少返回类型声明
@Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(id);
}
```

**Service 层规范**：
- **参数类型**：可选择使用 DTO 或 Type，根据具体需求决定
  - 需要运行时验证时使用 DTO
  - 纯业务逻辑处理时使用 Type
- **返回类型**：建议省略显式声明，利用 TypeScript 类型推断
- **数据传递**：利用 TypeScript 的结构化类型系统进行兼容性传递

```typescript
// ✅ 推荐：省略返回类型，利用类型推断
class UsersService {
  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  // ✅ 可选：参数使用 DTO 进行验证
  async createWithValidation(data: CreateUserDto) {
    // 运行时验证逻辑
    return this.prisma.user.create({ data });
  }
  
  // ✅ 可选：参数使用 Type 进行纯业务处理
  async create(data: CreateUserRequest) {
    return this.prisma.user.create({ data });
  }
}
```

#### 7. 注意事项

1. **返回类型策略**：Controller 层必须显式声明，Service 层建议省略
2. **API 契约**：Controller 返回类型声明确保前后端接口一致性
3. **类型推断限制**：复杂返回类型或需要明确文档时可显式声明
4. **工具支持**：IDE 和 TypeScript 编译器能更好地推断和检查类型
5. **类型兼容性**：确保 DTO 和 Type 的结构保持一致
6. **文档同步**：当 Schema 变更时，同时更新相关的 DTO 和 Type
7. **测试覆盖**：为 Service 层方法编写充分的单元测试
8. **性能考虑**：在高并发场景下，Service 层优先使用 Type
