# 🎬 AutoDoc 演示项目使用指南

## 📋 演示项目概述

这是一个完整的AutoDoc演示项目，包含：
- ✅ FastAPI后端示例（Python）
- ✅ Node.js文档服务器
- ✅ Vue 3前端界面
- ✅ 实时文档预览

---

## 🚀 快速开始（3步）

### 第一步：启动后端文档服务器

```bash
cd prodigy-workspace/projects/autodoc
node backend/src/server.js
```

**预期输出**：
```
Loading config from: C:\...\autodoc.config.js
🚀 AutoDoc server is running on http://localhost:3001
📚 API endpoint: http://localhost:3001/api/docs
💚 Health check: http://localhost:3001/health
👀 Watching directory: C:\...\examples
👀 File watcher started
```

### 第二步：启动前端界面

**新开一个终端窗口**，运行：

```bash
cd prodigy-workspace/projects/autodoc/frontend
npm install  # 首次运行需要安装依赖
npm run dev
```

**预期输出**：
```
VITE v5.0.0  ready in 1234 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 第三步：打开浏览器

访问 **http://localhost:3000**

你将看到AutoDoc的界面，显示所有解析的API端点！

---

## 📁 项目结构

```
autodoc/
├── examples/
│   └── app.py                    # FastAPI示例项目（你可以修改这个文件）
├── backend/
│   ├── src/
│   │   ├── parser/               # Python代码解析器
│   │   ├── generator/            # 文档生成器
│   │   ├── utils/                # 工具函数
│   │   └── server.js            # 后端服务器（端口3001）
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.vue               # 主界面组件
│   │   ├── style.css             # 样式文件
│   │   └── main.js              # 入口文件
│   ├── index.html
│   └── package.json
├── autodoc.config.js            # 配置文件
└── DEMO.md                      # 本文件
```

---

## 🎯 演示功能

### 1. 查看API列表

打开 http://localhost:3000，你会看到：

```
┌─────────────────────────────────────────┐
│  🚀 AutoDoc                          │
│  API Documentation Generator            │
├─────────────────────────────────────────┤
│  🔍 搜索 API endpoints...            │
│  [🔄 Refresh]                        │
├─────────────────────────────────────────┤
│  GET  /                             │
│  └─────────────────────────────── ▶    │
│                                       │
│  GET  /users/{user_id}               │
│  └─────────────────────────────── ▶    │
│                                       │
│  GET  /users                         │
│  └─────────────────────────────── ▶    │
│                                       │
│  POST /users                         │
│  └─────────────────────────────── ▶    │
│                                       │
│  PUT  /users/{user_id}               │
│  └─────────────────────────────── ▶    │
│                                       │
│  DELETE /users/{user_id}              │
│  └─────────────────────────────── ▶    │
└─────────────────────────────────────────┘
```

### 2. 点击展开API详情

点击任意API端点，查看详细信息：

```
GET /users/{user_id}
════════════════════════════════════════════

Description
获取用户信息
根据用户ID获取用户信息

Parameters
┌────────────┬──────────┬───────────┬──────────────┐
│ Name       │ Type     │ Required  │ Description  │
├────────────┼──────────┼───────────┼──────────────┤
│ user_id    │ int      │ Yes       │ 用户ID       │
└────────────┴──────────┴───────────┴──────────────┘

Responses
200  Success
```

### 3. 实时搜索

在搜索框输入关键词：
- 输入 `users` - 过滤出所有用户相关API
- 输入 `get` - 过滤出所有GET请求
- 输入 `user_id` - 过滤出包含user_id的API

### 4. 修改代码自动刷新

1. 打开 `examples/app.py`
2. 添加或修改一个API端点
3. 保存文件
4. 前端会自动刷新（或点击"🔄 Refresh"按钮）

---

## 📝 演示代码说明

### FastAPI示例项目（examples/app.py）

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    """用户模型"""
    name: str
    email: str
    age: int = None

@app.get("/")
async def root():
    """根路径"""
    return {"message": "Welcome to AutoDoc Demo"}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    """获取用户信息"""
    return {"id": user_id, "name": "John Doe"}
```

**支持的装饰器**：
- `@app.get()`
- `@app.post()`
- `@app.put()`
- `@app.delete()`

---

## 🔧 配置说明

### 配置文件（autodoc.config.js）

```javascript
module.exports = {
  // 入口文件（Python FastAPI项目）
  entry: './examples/app.py',

  // 输出目录（生成的文档保存在这里）
  output: './docs',

  // 项目信息
  title: 'AutoDoc Demo API',
  description: '示例API文档',
  version: '1.0.0',

  // 服务器配置
  port: 3001,  // 后端端口（前端使用3000）

  // 是否监听文件变化
  watch: true,

  // UI主题
  theme: 'auto',  // light | dark | auto
};
```

### 修改配置

1. 打开 `autodoc.config.js`
2. 修改配置项
3. 重启后端服务器

---

## 🌐 API端点说明

### 后端API（端口3001）

| 端点 | 方法 | 说明 |
|------|------|------|
| `/health` | GET | 健康检查 |
| `/api/docs` | GET | 获取API文档 |
| `/api/config` | GET | 获取配置 |
| `/api/docs/generate` | POST | 重新生成文档 |

### 测试API

```bash
# 健康检查
curl http://localhost:3001/health

# 获取文档
curl http://localhost:3001/api/docs

# 获取配置
curl http://localhost:3001/api/config

# 重新生成文档
curl -X POST http://localhost:3001/api/docs/generate
```

---

## 🎨 自定义你的项目

### 1. 创建自己的FastAPI项目

创建一个新文件 `my_project.py`：

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/hello")
async def hello():
    """问候接口"""
    return {"message": "Hello World"}

@app.post("/data")
async def create_data(data: dict):
    """创建数据"""
    return {"data": data, "status": "created"}
```

### 2. 修改配置文件

编辑 `autodoc.config.js`：

```javascript
module.exports = {
  entry: './my_project.py',  // 改成你的文件
  title: 'My API',          // 改成你的标题
  ...
};
```

### 3. 重启后端服务器

```bash
# 停止服务器（Ctrl+C）
# 重新启动
node backend/src/server.js
```

### 4. 查看结果

访问 http://localhost:3000

---

## 🐛 故障排除

### 问题1：端口被占用

**错误信息**：
```
Error: Port 3001 is already in use
```

**解决方案**：
```bash
# 修改 autodoc.config.js 中的端口
port: 3002,

# 或停止占用端口的进程
netstat -ano | findstr :3001
taskkill /PID <进程ID> /F
```

### 问题2：前端无法连接后端

**检查**：
1. 后端服务器是否正常运行？
2. 前端vite.config.js中的代理配置是否正确？

**vite.config.js**：
```javascript
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})
```

### 问题3：API解析失败

**检查**：
1. Python文件是否存在？
2. Python文件语法是否正确？
3. 装饰器格式是否正确？

**正确的格式**：
```python
@app.get("/path")  # ✅ 使用双引号
async def func():
    pass

@app.get('/path')  # ❌ 不支持单引号
```

---

## 📚 进阶功能

### 1. 多文件支持

AutoDoc自动监听整个目录下的所有Python文件：

```
examples/
├── app.py          # 主文件
├── users.py        # 用户模块
├── orders.py       # 订单模块
└── products.py     # 产品模块
```

### 2. 自定义分组

通过路径自动分组：

```python
@app.get("/users/list")
async def list_users():
    """用户列表"""
    # 自动分组到 "users"
    pass

@app.get("/orders/create")
async def create_order():
    """创建订单"""
    # 自动分组到 "orders"
    pass
```

### 3. 添加参数文档

```python
@app.get("/users/{user_id}")
async def get_user(user_id: int, active: bool = True):
    """
    获取用户信息

    Args:
        user_id: 用户ID
        active: 是否激活（可选）

    Returns:
        用户信息对象
    """
    return {"id": user_id, "active": active}
```

---

## 🎉 成功标志

如果看到以下内容，说明演示成功：

✅ 后端服务器启动成功
```
🚀 AutoDoc server is running on http://localhost:3001
```

✅ 前端服务器启动成功
```
➜  Local:   http://localhost:3000/
```

✅ 浏览器看到API列表
```
GET  /
GET  /users/{user_id}
POST /users
...
```

✅ 点击API可以看到详细信息

✅ 修改Python代码后自动刷新

---

## 📞 获取帮助

如果遇到问题：

1. 查看后端服务器日志
2. 查看浏览器控制台（F12）
3. 查看 [BUGFIX-SUMMARY.md](../../../BUGFIX-SUMMARY.md)
4. 查看 [README.md](README.md)

---

**现在开始你的AutoDoc之旅吧！** 🚀

Made with ❤️ by CodeProdigy
