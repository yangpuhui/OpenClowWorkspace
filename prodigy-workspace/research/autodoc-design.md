# AutoDoc - 方案设计文档

## 项目概述

**项目名称**：AutoDoc
**一句话描述**：API文档，零配置，自动生成
**目标用户**：后端开发者、API开发者
**核心价值**：从代码注释自动生成美观的API文档，省去手动写文档的痛苦

---

## 详细需求分析

### 核心功能（MVP）

#### 1. 代码解析
- 支持Python FastAPI框架
- 自动解析路由函数
- 提取函数注释（docstring）
- 提取类型提示（type hints）
- 提取请求方法（GET/POST/PUT/DELETE）
- 提取路径参数

#### 2. 文档生成
- 自动生成Markdown文档
- 自动生成HTML文档
- 响应式设计，支持移动端
- 支持深色模式
- 实时预览

#### 3. UI界面
- 侧边栏导航（API分组）
- 搜索功能（API名称、路径）
- API详情页
- 请求参数表格
- 响应示例
- 复制代码功能

#### 4. 实时更新
- 监控文件变化
- 自动重新生成文档
- 热重载

---

## 技术架构

### 整体架构

```
┌─────────────────┐
│   用户界面      │  (Vue 3 + Vite)
└────────┬────────┘
         │ HTTP API
         ↓
┌─────────────────┐
│   后端服务      │  (Node.js + Express)
├─────────────────┤
│ - 文件解析器    │
│ - 文档生成器    │
│ - 文件监听器    │
└────────┬────────┘
         │ 读取
         ↓
┌─────────────────┐
│  Python代码     │  (用户的FastAPI项目)
└─────────────────┘
```

### 技术栈

#### 前端
- **框架**：Vue 3 (Composition API)
- **构建工具**：Vite
- **UI组件库**：Element Plus（美观、中文友好）
- **路由**：Vue Router
- **状态管理**：Pinia
- **HTTP客户端**：Axios
- **代码高亮**：Prism.js / Shiki

#### 后端
- **运行时**：Node.js 18+
- **框架**：Express.js
- **文件监听**：chokidar
- **模板引擎**：EJS / Handlebars
- **API解析**：AST解析（Babel或自定义）

#### 开发工具
- **包管理**：pnpm
- **代码规范**：ESLint + Prettier
- **测试框架**：Vitest + Jest
- **文档工具**：VitePress（用于项目文档）

---

## 数据结构设计

### API文档数据结构

```typescript
interface APIDocument {
  title: string;           // API标题
  version: string;         // 版本号
  description: string;     // 描述
  baseUrl?: string;        // Base URL
  groups: APIGroup[];      // API分组
}

interface APIGroup {
  name: string;            // 分组名称
  apis: API[];             // API列表
}

interface API {
  id: string;              // 唯一ID
  path: string;            // 路径
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';  // HTTP方法
  summary: string;         // 简短描述
  description: string;     // 详细描述
  parameters: Parameter[]; // 请求参数
  responses: Response[];   // 响应
  tags: string[];          // 标签
}

interface Parameter {
  name: string;            // 参数名
  type: string;            // 类型
  required: boolean;        // 是否必填
  description: string;      // 描述
  example?: any;            // 示例值
}

interface Response {
  statusCode: number;       // 状态码
  description: string;      // 描述
  schema: any;              // 响应结构
  example?: any;            // 示例
}
```

### 文件配置结构

```javascript
// autodoc.config.js
module.exports = {
  // 入口文件
  entry: './app.py',

  // 输出目录
  output: './docs',

  // 项目配置
  title: 'My API',
  description: 'API文档描述',
  version: '1.0.0',

  // UI配置
  theme: 'light',  // light | dark | auto

  // 监听配置
  watch: true,

  // 服务器配置
  port: 3000,
};
```

---

## API接口设计

### 后端API

#### 1. 获取文档
```
GET /api/docs
Response: APIDocument
```

#### 2. 重新生成文档
```
POST /api/docs/generate
Response: { success: boolean, message: string }
```

#### 3. 获取文件状态
```
GET /api/files/status
Response: { files: string[], lastModified: number }
```

#### 4. WebSocket（实时更新）
```
WS /ws/events
Event: 'docs-updated'
```

---

## UI/UX设计

### 主界面布局

```
┌─────────────────────────────────────────────┐
│  Header: AutoDoc logo, 深色模式切换, 刷新   │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Sidebar  │       Main Content              │
│          │                                  │
│  分组1   │   API详情页                      │
│    ├ API1│   - 方法标识                      │
│    ├ API2│   - 路径                         │
│    └ API3│   - 描述                         │
│          │                                  │
│  分组2   │   参数表格                        │
│    ├ API4│   响应示例                        │
│    └ API5│                                  │
│          │                                  │
├──────────┴──────────────────────────────────┤
│  Footer: 搜索框, 版本信息                    │
└─────────────────────────────────────────────┘
```

### 色彩方案

#### 浅色模式
- 主色：#409EFF（蓝色）
- 背景：#FFFFFF
- 文字：#303133
- 边框：#DCDFE6

#### 深色模式
- 主色：#409EFF（蓝色）
- 背景：#1A1A1A
- 文字：#E5E5E5
- 边框：#4C4D4F

---

## 开发计划

### Day 1-2: 需求挖掘 ✅
- [x] 需求调研
- [x] 项目选定
- [x] 方案设计

### Day 3: 后端开发
- [ ] 初始化项目结构
- [ ] 实现Python FastAPI解析器
- [ ] 实现文档生成器
- [ ] 实现文件监听器
- [ ] 实现HTTP API

### Day 4: 前端开发
- [ ] 初始化Vue 3项目
- [ ] 实现主界面布局
- [ ] 实现API文档展示
- [ ] 实现搜索功能
- [ ] 实现深色模式
- [ ] 实现实时预览

### Day 5: 测试与优化
- [ ] 编写单元测试
- [ ] 编写集成测试
- [ ] 性能优化
- [ ] Bug修复
- [ ] 完善文档

### Day 6: 发布准备
- [ ] 完整README（含动图）
- [ ] 示例代码
- [ ] 发布到GitHub
- [ ] 准备推广素材

### Day 7: 推广
- [ ] Hacker News
- [ ] Product Hunt
- [ ] Reddit
- [ ] V2EX

---

## 成功标准

- ✅ 支持Python FastAPI
- ✅ 零配置，即插即用
- ✅ 美观的UI界面
- ✅ 实时预览
- ✅ 单元测试覆盖率>80%
- ✅ 完整文档（含动图演示）

---

**设计完成时间**：2026-03-12 11:45
**下一步**：开始后端开发
