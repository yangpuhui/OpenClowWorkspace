# AutoDoc 快速使用指南

## 🚀 一分钟启动

### Windows用户

1. 双击运行 `start.bat`

2. 等待自动安装依赖（首次运行约1-2分钟）

3. 浏览器自动打开 `http://localhost:3000`

完成！✨

---

## 📝 手动启动

### 启动后端服务

```bash
cd backend
npm install
node src/server.js
```

后端将在 `http://localhost:3001` 运行

### 启动前端服务

新开一个终端窗口：

```bash
cd frontend
npm install
npm run dev
```

前端将在 `http://localhost:3000` 运行

---

## 🎯 基本使用

### 1. 配置你的FastAPI项目

在项目根目录创建 `autodoc.config.js`：

```javascript
module.exports = {
  entry: './app.py',           // 你的FastAPI入口文件
  output: './docs',             // 文档输出目录（可选）
  title: 'My API',             // 项目标题
  description: 'API文档',       // 项目描述
  port: 3001                    // 后端端口
}
```

### 2. 放置示例项目

将你的FastAPI项目放在 `examples/` 目录下，例如：

```
examples/
└── app.py
```

示例代码（`examples/app.py`）：

```python
from fastapi import FastAPI
from typing import Optional

app = FastAPI()

@app.get("/")
def read_root():
    """API根路径"""
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    """获取物品信息

    Args:
        item_id: 物品ID
        q: 搜索关键词（可选）

    Returns:
        物品信息
    """
    return {"item_id": item_id, "q": q}
```

### 3. 自动生成文档

AutoDoc会自动：
- 解析FastAPI路由
- 提取函数注释
- 提取类型提示
- 生成美观的HTML文档

### 4. 访问文档

打开浏览器访问 `http://localhost:3000`

你将看到：
- 所有API端点列表
- 每个API的详细信息
- 参数说明
- 响应示例
- 搜索功能

---

## 🔍 功能说明

### 搜索API

在搜索框输入关键词：
- 路径搜索：`/users`
- 描述搜索：`获取用户`

### 查看详情

点击任意API端点展开详细信息：
- HTTP方法（GET/POST/PUT/DELETE）
- 请求参数
- 响应格式
- 示例代码

### 实时更新

修改你的Python代码后，文档会自动刷新，无需重启！

---

## 🧪 运行测试

```bash
cd test
node test.js
```

预期输出：
```
✅ All tests passed!
```

---

## 🎨 自定义样式

修改 `frontend/src/style.css` 自定义UI样式。

支持的CSS变量：
- `--primary` - 主色调
- `--bg` - 背景色
- `--text` - 文字颜色
- 等等...

---

## 📦 项目结构

```
autodoc/
├── backend/               # 后端服务
│   ├── src/
│   │   ├── parser/       # FastAPI解析器
│   │   ├── generator/    # 文档生成器
│   │   ├── utils/        # 工具函数
│   │   └── server.js     # Express服务器
│   └── package.json
├── frontend/             # 前端界面
│   ├── src/
│   │   ├── App.vue       # 主组件
│   │   ├── style.css     # 样式
│   │   └── main.js       # 入口
│   ├── index.html
│   └── package.json
├── examples/             # 示例项目
│   └── app.py           # FastAPI示例
├── test/                # 测试
│   └── test.js
├── docs/               # 生成的文档（可选）
├── autodoc.config.js   # 配置文件
├── start.bat          # 启动脚本（Windows）
└── README.md          # 项目文档
```

---

## ❓ 常见问题

### Q: 支持其他框架吗？
A: 当前只支持FastAPI，计划添加Flask、Django REST Framework支持。

### Q: 可以导出静态HTML吗？
A: 可以！调用 `POST /api/generate` 接口生成静态文档。

### Q: 如何添加认证？
A: 在Express服务器中添加中间件即可（见 `server.js`）。

### Q: 端口冲突怎么办？
A: 修改 `autodoc.config.js` 中的 `port` 配置。

---

## 🚀 下一步

- 添加更多示例
- 自定义主题
- 部署到生产环境
- 贡献代码到GitHub

---

**需要帮助？** 查看 [README.md](README.md) 或提交 [GitHub Issue](https://github.com/yangpuhui/OpenClowWorkspace/issues)
