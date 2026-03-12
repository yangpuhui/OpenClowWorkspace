# 🚀 AutoDoc 演示项目 - 快速使用指南

## ⚡ 一键启动

### 方法1：双击运行（推荐）

```bash
打开文件夹：prodigy-workspace/projects/autodoc
双击文件：demo.bat
```

**会发生什么**：
- ✅ 自动启动后端服务器（端口3001）
- ✅ 自动启动前端界面（端口3000）
- ✅ 自动打开浏览器到 http://localhost:3000

### 方法2：手动启动

**步骤1：启动后端**
```bash
cd prodigy-workspace/projects/autodoc
node backend/src/server.js
```

**步骤2：启动前端（新窗口）**
```bash
cd prodigy-workspace/projects/autodoc/frontend
npm install  # 首次运行
npm run dev
```

**步骤3：打开浏览器**
```
http://localhost:3000
```

---

## 📋 你将看到什么

### 前端界面（http://localhost:3000）

```
┌─────────────────────────────────────────┐
│  🚀 AutoDoc                          │
│  API Documentation Generator            │
├─────────────────────────────────────────┤
│  🔍 搜索...           [🔄 Refresh]  │
├─────────────────────────────────────────┤
│  GET  /                              │
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

### 点击任意API查看详情

```
GET /users/{user_id}
════════════════════════════════════════════

Description
获取用户信息

Parameters
┌────────────┬──────────┬───────────┬──────────────┐
│ Name       │ Type     │ Required  │ Description  │
├────────────┼──────────┼───────────┼──────────────┤
│ user_id    │ int      │ Yes       │ 用户ID       │
└────────────┴──────────┴───────────┴──────────────┘

Responses
200  Success
```

---

## 🎯 演示功能

### 1. 查看所有API

浏览器打开后自动显示所有解析的API端点：
- ✅ GET  /
- ✅ GET  /users/{user_id}
- ✅ GET  /users
- ✅ POST /users
- ✅ PUT  /users/{user_id}
- ✅ DELETE /users/{user_id}

### 2. 实时搜索

在搜索框输入：
- `users` → 只显示用户相关API
- `get` → 只显示GET请求
- `user_id` → 只显示包含user_id的API

### 3. 自动刷新

修改 `examples/app.py`，保存后：
1. 后端自动检测文件变化
2. 自动重新解析代码
3. 前端点击"🔄 Refresh"查看最新文档

---

## 📝 演示代码

### 查看示例项目

编辑文件：`prodigy-workspace/projects/autodoc/examples/app.py`

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
async def root():
    """根路径"""
    return {"message": "Welcome to AutoDoc Demo"}

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    """获取用户信息"""
    return {"id": user_id, "name": "John Doe"}
```

### 添加新API试试

在 `app.py` 中添加：

```python
@app.get("/hello")
async def hello():
    """问候接口"""
    return {"message": "Hello World"}
```

保存后，刷新浏览器，你会看到新API！

---

## 🧪 测试API

### 方法1：使用批处理脚本

```bash
cd prodigy-workspace/projects/autodoc
双击：test-api.bat
```

### 方法2：使用curl

```bash
# 健康检查
curl http://localhost:3001/health

# 获取文档
curl http://localhost:3001/api/docs

# 获取配置
curl http://localhost:3001/api/config
```

### 方法3：在浏览器中直接访问

```
http://localhost:3001/health
http://localhost:3001/api/docs
http://localhost:3001/api/config
```

---

## 🎨 自定义配置

### 修改配置文件

编辑：`prodigy-workspace/projects/autodoc/autodoc.config.js`

```javascript
module.exports = {
  entry: './examples/app.py',  // 入口文件
  title: 'My API',           // 标题
  port: 3001,               // 后端端口
  watch: true,              // 是否监听文件变化
};
```

修改后重启后端服务器。

---

## 🐛 常见问题

### Q: 双击demo.bat没反应？
**A**: 右键 → 以管理员身份运行

### Q: 端口被占用？
**A**: 修改 `autodoc.config.js` 中的 `port` 为其他端口

### Q: 前端空白？
**A**:
1. 检查后端是否运行
2. 检查浏览器控制台（F12）
3. 确认端口3000和3001是否都启动了

### Q: 找不到API？
**A**:
1. 检查 `examples/app.py` 文件是否存在
2. 检查Python语法是否正确
3. 查看后端服务器日志

---

## 📚 详细文档

查看完整文档：
- **使用指南**: [DEMO.md](prodigy-workspace/projects/autodoc/DEMO.md)
- **快速开始**: [QUICKSTART.md](prodigy-workspace/projects/autodoc/QUICKSTART.md)
- **项目文档**: [README.md](prodigy-workspace/projects/autodoc/README.md)
- **Bug修复**: [BUGFIX-SUMMARY.md](BUGFIX-SUMMARY.md)
- **完成报告**: [MVP-COMPLETE.md](prodigy-workspace/projects/autodoc/MVP-COMPLETE.md)

---

## 🎉 成功标志

如果看到以下内容，说明演示成功：

✅ 浏览器显示6个API端点
✅ 点击API可以看到详细信息
✅ 搜索功能正常工作
✅ 修改代码后可以刷新看到新API
✅ 后端服务器正常运行
✅ 前端界面美观流畅

---

## 🚀 下一步

1. **探索功能** - 点击每个API查看详情
2. **修改代码** - 在examples/app.py中添加新API
3. **自定义配置** - 修改autodoc.config.js
4. **阅读文档** - 查看DEMO.md了解更多功能

---

**现在就开始体验AutoDoc吧！** ⚡

双击 `demo.bat` 即可启动！

---

**GitHub仓库**: https://github.com/yangpuhui/OpenClowWorkspace
**项目路径**: prodigy-workspace/projects/autodoc

Made with ❤️ by CodeProdigy
