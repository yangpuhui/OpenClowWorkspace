# AutoDoc

> API文档，零配置，自动生成 ⚡

[![Star](https://img.shields.io/github/stars/yangpuhui/OpenClowWorkspace?style=social)](https://github.com/yangpuhui/OpenClowWorkspace)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**AutoDoc** 是一个轻量级的API文档自动生成工具，从代码注释自动生成美观的文档，零配置，即插即用。

## ✨ 特性

- 🔥 **零配置**：无需任何配置文件，自动生成文档
- 🚀 **即插即用**：支持 Python FastAPI，一行命令启动
- 🎨 **美观界面**：现代化的UI设计，支持深色模式
- 📱 **响应式**：完美支持移动端和桌面端
- 🔄 **实时预览**：文件变化自动更新文档
- 🔍 **搜索功能**：快速查找API
- 🌍 **多语言**：支持多种语言（当前支持Python FastAPI，持续扩展中）

## 🚀 快速开始

### 安装

```bash
npm install -g @autodoc/cli
```

### 使用

1. 在你的 FastAPI 项目根目录运行：

```bash
autodoc init
```

2. 启动文档服务：

```bash
autodoc serve
```

3. 打开浏览器访问 `http://localhost:3000`

## 📖 示例

### Python FastAPI 示例

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

@app.get("/users/{user_id}")
async def get_user(user_id: int):
    """获取用户信息

    Args:
        user_id: 用户ID

    Returns:
        用户信息
    """
    return {"id": user_id, "name": "John Doe"}
```

AutoDoc 会自动提取注释、类型提示、参数信息，生成完整的API文档。

## 🎯 功能演示

### 文档界面

```
┌─────────────────────────────────────────────┐
│  API文档                     🌙            │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ 用户管理  │   GET /users/{user_id}           │
│          │                                  │
│ 用户列表  │   获取用户信息                    │
│ 用户详情  │                                  │
│          │   Parameters                    │
│ 订单管理  │   user_id (int) - 用户ID        │
│          │                                  │
│          │   Response                       │
│          │   {                              │
│          │     "id": 1,                    │
│          │     "name": "John Doe"           │
│          │   }                              │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

## 📦 项目结构

```
autodoc/
├── backend/          # 后端服务
│   ├── src/
│   │   ├── parser/   # 代码解析器
│   │   ├── generator/ # 文档生成器
│   │   └── server.js # Express服务器
│   └── package.json
├── frontend/         # 前端界面
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── App.vue
│   └── package.json
├── examples/         # 示例项目
│   └── fastapi-demo/
├── docs/            # 文档
└── README.md
```

## 🔧 配置

AutoDoc 支持通过 `autodoc.config.js` 进行自定义配置：

```javascript
module.exports = {
  // 入口文件
  entry: './app.py',

  // 输出目录
  output: './docs',

  // 项目信息
  title: 'My API',
  description: 'API文档描述',
  version: '1.0.0',

  // 服务器配置
  port: 3000,
};
```

## 🎨 UI特性

- ✨ 现代化设计
- 🌓 深色模式支持
- 📱 响应式布局
- 🔍 强大的搜索功能
- 📋 代码复制功能
- 🏷️ API分组管理

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [FastAPI](https://fastapi.tiangolo.com/) - 现代化的Python Web框架
- [Vue 3](https://vuejs.org/) - 渐进式JavaScript框架
- [Element Plus](https://element-plus.org/) - Vue 3 UI组件库

## 📮 联系方式

- **GitHub**: [yangpuhui/OpenClowWorkspace](https://github.com/yangpuhui/OpenClowWorkspace)
- **Issues**: [GitHub Issues](https://github.com/yangpuhui/OpenClowWorkspace/issues)

---

**让API文档不再痛苦，让开发者专注代码** ⚡

Made with ❤️ by CodeProdigy
