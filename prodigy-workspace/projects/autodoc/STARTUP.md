# 🚀 AutoDoc 快速启动指南

## ⚡ 三种启动方式

### 方式1：超快速（推荐）
```
双击文件: RUN.bat
```
一行命令启动所有服务，自动打开浏览器。

---

### 方式2：标准启动
```
双击文件: start.bat
```
清晰的启动过程提示，自动打开浏览器。

---

### 方式3：详细启动
```
双击文件: demo.bat
```
最详细的启动信息和提示。

---

## 📋 启动后访问

### 前端界面
```
http://localhost:3000
```

### 后端API
```
http://localhost:3001/api/docs
http://localhost:3001/health
```

---

## 🧪 测试API

### 使用批处理脚本
```
双击文件: test-api.bat
```

### 手动测试
```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/docs
```

---

## 📁 启动脚本说明

| 脚本 | 说明 | 适用场景 |
|------|------|---------|
| **RUN.bat** | 单行命令，最快 | 快速测试 |
| **start.bat** | 标准启动 | 日常使用 |
| **demo.bat** | 详细提示 | 新手使用 |
| **test-api.bat** | 测试API | 调试时 |

---

## 🎯 成功标志

启动后你应该看到：

✅ 两个新的命令行窗口打开
✅ 浏览器自动打开
✅ 前端显示6个API端点
✅ 后端正常运行

---

## 🐛 如果出现问题

### 1. 端口被占用
修改 `autodoc.config.js`:
```javascript
port: 3002,  // 改成其他端口
```

### 2. npm依赖未安装
```bash
cd frontend
npm install
```

### 3. 浏览器没有打开
手动访问: http://localhost:3000

---

## 📚 更多文档

- **演示指南**: [DEMO.md](DEMO.md)
- **快速开始**: [QUICKSTART.md](QUICKSTART.md)
- **项目文档**: [README.md](README.md)
- **Bug修复**: [BUGFIX-SUMMARY.md](../../BUGFIX-SUMMARY.md)

---

## 🎉 现在就试试

最简单的方式：
```
双击 RUN.bat
```

**3秒内就能看到演示！** ⚡
