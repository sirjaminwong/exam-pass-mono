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
