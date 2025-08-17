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
    ├── users.controller.ts
    ├── users.service.ts
    └── users.module.ts
```

### 开发规范

1. **模块化**: 按功能划分模块
2. **依赖注入**: 使用 NestJS 的依赖注入系统
3. **数据库**: 使用 Prisma ORM
4. **API 文档**: 使用 Swagger 自动生成文档
5. **测试**: 编写单元测试和集成测试

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