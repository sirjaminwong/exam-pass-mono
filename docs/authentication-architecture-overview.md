# Exam Pass Mono 认证架构总览

## 文档概述

本文档提供了 Exam Pass Mono 项目完整认证架构的总体概览，包括系统设计、技术实现、安全策略和相关文档索引。

## 1. 架构概览

### 1.1 整体架构图

```mermaid
graph TB
    subgraph "前端 (Next.js)"
        MW["Next.js Middleware"]
        AC["Auth Context"]
        TM["Token Manager"]
        HI["HTTP Interceptor"]
        AG["Auth Guards"]
        AU["Auth Utils"]
    end
    
    subgraph "后端 (NestJS)"
        AS["Auth Service"]
        AC2["Auth Controller"]
        JS["JWT Strategy"]
        JG["JWT Guard"]
        US["User Service"]
    end
    
    subgraph "存储层"
        DB[("PostgreSQL")]
        COOKIE["Browser Cookies"]
    end
    
    MW --> AC
    AC --> TM
    AC --> HI
    AG --> AC
    HI --> TM
    AU --> TM
    
    HI --> AC2
    AC2 --> AS
    AS --> JS
    AS --> US
    JG --> JS
    US --> DB
    
    TM --> COOKIE
    AS --> DB
```

### 1.2 核心组件职责

| 组件 | 位置 | 主要职责 |
|------|------|----------|
| **Next.js Middleware** | 前端 | 服务端路由保护、JWT验证、重定向处理 |
| **Auth Context** | 前端 | 全局认证状态管理、用户信息存储 |
| **Token Manager** | 前端 | 统一Token存储、Cookie操作、SSR支持 |
| **HTTP Interceptor** | 前端 | 自动Token刷新、请求拦截、错误处理 |
| **Auth Guards** | 前端 | 组件级认证控制、页面保护 |
| **Auth Service** | 后端 | 用户认证、Token生成、业务逻辑 |
| **JWT Strategy** | 后端 | JWT验证策略、Passport集成 |
| **Auth Controller** | 后端 | 认证API端点、请求处理 |

## 2. 认证流程

### 2.1 用户登录流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端应用
    participant M as Middleware
    participant B as 后端API
    participant D as 数据库
    
    U->>F: 访问登录页面
    F->>M: 路由检查
    M->>M: 检查认证状态
    M->>F: 允许访问登录页
    
    U->>F: 提交登录表单
    F->>B: POST /auth/login
    B->>D: 验证用户凭据
    D->>B: 返回用户信息
    B->>B: 生成JWT Token对
    B->>F: 返回Token和用户信息
    
    F->>F: 存储Token到Cookie
    F->>F: 更新认证状态
    F->>U: 重定向到目标页面
```

### 2.2 受保护页面访问流程

```mermaid
sequenceDiagram
    participant U as 用户
    participant M as Middleware
    participant F as 前端应用
    participant B as 后端API
    
    U->>M: 访问受保护页面
    M->>M: 检查Cookie中的Token
    
    alt Token有效
        M->>F: 允许访问页面
        F->>F: 渲染页面内容
        F->>B: 获取页面数据
        B->>F: 返回数据
        F->>U: 显示完整页面
    else Token无效/过期
        M->>M: 构建重定向URL
        M->>U: 重定向到登录页
    end
```

### 2.3 Token自动刷新流程

```mermaid
sequenceDiagram
    participant F as 前端应用
    participant I as HTTP拦截器
    participant B as 后端API
    
    F->>I: 发起API请求
    I->>I: 检查Access Token
    
    alt Token即将过期
        I->>I: 触发预防性刷新
        I->>B: POST /auth/refresh
        B->>I: 返回新Token对
        I->>I: 更新存储的Token
        I->>B: 执行原始请求
        B->>I: 返回数据
        I->>F: 返回响应
    else Token已过期
        I->>B: 带过期Token的请求
        B->>I: 返回401错误
        I->>I: 自动刷新Token
        I->>B: POST /auth/refresh
        B->>I: 返回新Token对
        I->>I: 更新Token
        I->>B: 重试原始请求
        B->>I: 返回数据
        I->>F: 返回响应
    end
```

## 3. 技术栈和依赖

### 3.1 前端技术栈

```json
{
  "核心框架": {
    "Next.js": "15.x",
    "React": "19.x",
    "TypeScript": "5.x"
  },
  "认证相关依赖": {
    "jwt-decode": "JWT解码",
    "js-cookie": "Cookie操作",
    "@tanstack/react-query": "数据获取和缓存",
    "axios": "HTTP客户端"
  },
  "类型定义": {
    "@types/js-cookie": "Cookie类型定义",
    "自定义类型": "auth-types.ts"
  }
}
```

### 3.2 后端技术栈

```json
{
  "核心框架": {
    "NestJS": "10.x",
    "Node.js": "18.x+",
    "TypeScript": "5.x"
  },
  "认证相关依赖": {
    "@nestjs/jwt": "JWT处理",
    "@nestjs/passport": "认证策略",
    "passport-jwt": "JWT策略",
    "bcrypt": "密码哈希",
    "zod": "数据验证"
  },
  "数据库": {
    "Prisma": "ORM",
    "PostgreSQL": "数据库"
  }
}
```

## 4. 安全策略

### 4.1 多层安全防护

```mermaid
graph LR
    subgraph "第一层：网络安全"
        HTTPS["HTTPS传输"]
        CORS["CORS策略"]
        CSP["内容安全策略"]
    end
    
    subgraph "第二层：认证安全"
        JWT["JWT签名验证"]
        EXP["Token过期检查"]
        REF["Token刷新机制"]
    end
    
    subgraph "第三层：授权安全"
        RBAC["角色权限控制"]
        GUARD["路由守卫"]
        API["API权限验证"]
    end
    
    subgraph "第四层：数据安全"
        HASH["密码哈希"]
        VALID["输入验证"]
        ESCAPE["输出转义"]
    end
```

### 4.2 安全配置

#### Cookie安全配置
```typescript
const securityConfig = {
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only
    sameSite: 'strict', // CSRF protection
    httpOnly: false, // 前端需要读取（考虑改为true）
    path: '/', // 全站可用
  },
  jwt: {
    accessTokenExpiry: '15m', // 短期有效
    refreshTokenExpiry: '7d', // 长期有效
    algorithm: 'HS256', // 签名算法
  },
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
};
```

### 4.3 威胁防护

| 威胁类型 | 防护措施 | 实现位置 |
|----------|----------|----------|
| **XSS攻击** | CSP策略、输入验证、输出转义 | 前端+后端 |
| **CSRF攻击** | SameSite Cookie、Origin验证 | 前端+后端 |
| **Token劫持** | HTTPS传输、短期Token | 全栈 |
| **重放攻击** | Token过期、请求签名 | 后端 |
| **暴力破解** | 登录限制、账户锁定 | 后端 |
| **SQL注入** | Prisma ORM、参数化查询 | 后端 |

## 5. 性能优化

### 5.1 前端性能优化

```typescript
// 性能优化策略
const performanceOptimizations = {
  // Token验证缓存
  tokenValidation: {
    clientSideCache: true,
    cacheTimeout: 60000, // 1分钟
  },
  
  // 用户信息缓存
  userProfile: {
    staleTime: 5 * 60 * 1000, // 5分钟
    cacheTime: 10 * 60 * 1000, // 10分钟
  },
  
  // 预防性Token刷新
  tokenRefresh: {
    threshold: 5 * 60, // 提前5分钟刷新
    concurrencyControl: true,
  },
  
  // 路由预加载
  routePreloading: {
    protectedRoutes: true,
    userBasedPreloading: true,
  }
};
```

### 5.2 后端性能优化

```typescript
// 后端性能配置
const backendOptimizations = {
  // JWT配置
  jwt: {
    algorithm: 'HS256', // 快速算法
    clockTolerance: 30, // 时钟偏差容忍
  },
  
  // 数据库优化
  database: {
    connectionPooling: true,
    queryOptimization: true,
    indexing: ['email', 'id', 'role'],
  },
  
  // 缓存策略
  caching: {
    userProfile: '5m',
    permissions: '10m',
    publicData: '1h',
  }
};
```

## 6. 监控和日志

### 6.1 关键指标

```typescript
// 监控指标定义
const monitoringMetrics = {
  authentication: {
    loginSuccessRate: 'percentage',
    loginFailureRate: 'percentage',
    tokenRefreshRate: 'requests/minute',
    sessionDuration: 'minutes',
  },
  
  performance: {
    authenticationLatency: 'milliseconds',
    tokenValidationTime: 'milliseconds',
    middlewareExecutionTime: 'milliseconds',
  },
  
  security: {
    failedLoginAttempts: 'count',
    suspiciousActivity: 'count',
    tokenExpirationEvents: 'count',
  }
};
```

### 6.2 日志策略

```typescript
// 日志记录策略
const loggingStrategy = {
  levels: {
    ERROR: ['认证失败', '系统错误', '安全事件'],
    WARN: ['Token即将过期', '异常访问模式'],
    INFO: ['用户登录', 'Token刷新', '权限变更'],
    DEBUG: ['Token验证', '中间件执行', '数据库查询'],
  },
  
  retention: {
    security: '1年',
    audit: '6个月',
    performance: '3个月',
    debug: '1个月',
  }
};
```

## 7. 测试策略

### 7.1 测试金字塔

```mermaid
pyramid
    title 认证系统测试金字塔
    
    "E2E测试" : 10
    "集成测试" : 30
    "单元测试" : 60
```

### 7.2 测试覆盖范围

| 测试类型 | 覆盖范围 | 工具 | 目标覆盖率 |
|----------|----------|------|------------|
| **单元测试** | 工具函数、组件逻辑 | Jest, React Testing Library | 90%+ |
| **集成测试** | API端点、认证流程 | Jest, Supertest | 80%+ |
| **E2E测试** | 完整用户流程 | Playwright | 70%+ |
| **安全测试** | 漏洞扫描、渗透测试 | OWASP ZAP, 手动测试 | 100% |

## 8. 部署和运维

### 8.1 环境配置

```bash
# 生产环境必需的环境变量

# JWT配置
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# 数据库配置
DATABASE_URL=postgresql://user:pass@host:port/db

# 应用配置
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
API_URL=https://api.your-domain.com

# 安全配置
CORS_ORIGIN=https://your-domain.com
COOKIE_SECURE=true
HTTPS_ONLY=true
```

### 8.2 部署检查清单

- [ ] **安全配置**
  - [ ] JWT密钥强度验证
  - [ ] HTTPS证书配置
  - [ ] CORS策略设置
  - [ ] Cookie安全标志

- [ ] **性能配置**
  - [ ] 数据库连接池
  - [ ] 缓存策略配置
  - [ ] CDN配置
  - [ ] 负载均衡设置

- [ ] **监控配置**
  - [ ] 日志收集系统
  - [ ] 性能监控工具
  - [ ] 错误追踪系统
  - [ ] 安全监控告警

## 9. 相关文档索引

### 9.1 技术文档

| 文档名称 | 路径 | 描述 |
|----------|------|------|
| **双Token认证机制指南** | `/docs/dual-token-authentication-guide.md` | 详细的双Token实现说明 |
| **前端认证架构** | `/apps/web/src/docs/frontend-auth-architecture.md` | 前端认证组件详解 |
| **认证迁移指南** | `/apps/web/src/docs/auth-migration-guide.md` | HOC到Hook的迁移过程 |
| **后端认证API** | `/apps/api/src/auth/README.md` | 后端认证API使用指南 |

### 9.2 代码文件索引

#### 前端核心文件
```
apps/web/src/
├── middleware.ts                 # Next.js中间件
├── contexts/auth-context.tsx     # 认证上下文
├── utils/
│   ├── token-manager.ts         # Token管理器
│   ├── auth-utils.ts            # 认证工具函数
│   └── http-interceptor.ts      # HTTP拦截器
├── hooks/
│   └── useAuthGuard.ts          # 认证守卫Hook
└── types/auth-types.ts          # 认证类型定义
```

#### 后端核心文件
```
apps/api/src/auth/
├── auth.module.ts               # 认证模块
├── auth.service.ts              # 认证服务
├── auth.controller.ts           # 认证控制器
├── dto/                         # 数据传输对象
├── guards/                      # 认证守卫
├── strategies/                  # 认证策略
└── decorators/                  # 认证装饰器
```

## 10. 最佳实践总结

### 10.1 开发最佳实践

1. **安全优先**
   - 始终使用HTTPS
   - 实施最小权限原则
   - 定期更新依赖
   - 进行安全代码审查

2. **性能考虑**
   - 合理设置Token过期时间
   - 实现智能缓存策略
   - 优化数据库查询
   - 监控关键性能指标

3. **用户体验**
   - 无感知Token刷新
   - 友好的错误提示
   - 快速的认证响应
   - 一致的交互体验

4. **可维护性**
   - 模块化设计
   - 清晰的代码注释
   - 完善的测试覆盖
   - 详细的文档说明

### 10.2 运维最佳实践

1. **监控和告警**
   - 设置关键指标监控
   - 配置异常告警机制
   - 定期安全审计
   - 性能基准测试

2. **备份和恢复**
   - 定期数据备份
   - 灾难恢复计划
   - 配置回滚策略
   - 测试恢复流程

3. **扩展性规划**
   - 水平扩展设计
   - 负载均衡配置
   - 缓存层优化
   - 数据库分片准备

## 11. 未来发展方向

### 11.1 短期改进（1-3个月）

- [ ] 实现Token轮换机制
- [ ] 增强安全监控
- [ ] 优化性能指标
- [ ] 完善错误处理

### 11.2 中期规划（3-6个月）

- [ ] 实现多因素认证（MFA）
- [ ] 设备指纹识别
- [ ] 行为分析系统
- [ ] 零信任架构迁移

### 11.3 长期愿景（6-12个月）

- [ ] 联邦身份认证
- [ ] 生物识别集成
- [ ] AI驱动的安全分析
- [ ] 区块链身份验证

## 12. 结论

Exam Pass Mono 的认证架构采用了现代化的设计理念和最佳实践，实现了：

- **安全性**：多层防护、JWT双Token机制、完善的权限控制
- **性能**：智能缓存、预防性刷新、优化的数据库查询
- **用户体验**：无感知认证、快速响应、友好的错误处理
- **可维护性**：模块化设计、清晰的职责分离、完善的文档
- **扩展性**：支持未来的安全需求和业务发展

这个架构为项目提供了坚实的认证基础，能够满足当前的业务需求，同时具备良好的扩展性以适应未来的发展。通过持续的监控、优化和改进，可以确保认证系统始终保持高水平的安全性、性能和用户体验。