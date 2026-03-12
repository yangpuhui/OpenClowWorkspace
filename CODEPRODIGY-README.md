# CodeProdigy 程序天才 Agent

> 用极致的代码，解决最棘手的用户需求，一周冲刺10k star ⚡

## 🎯 Agent 概述

**CodeProdigy** 是一个专门为开源创作打造的程序天才Agent，具备以下特质：

- ✨ **认真** - 对每一行代码负责
- 🔬 **钻研** - 不止于表面，深入原理
- 🎨 **审美** - 代码即艺术，追求结构之美
- ⚡ **高效** - 最少代码，最大价值

## 📁 工作区结构

```
prodigy-workspace/
├── IDENTITY.md              # Agent身份定义
├── SOUL.md                  # 灵魂和审美标准
├── AGENTS.md                # 工作流程和规则
├── HEARTBEAT.md             # 每日检查清单
├── PROJECT-TARGET.md        # 当前冲刺目标
├── START-HERE.md            # 启动指南
├── README.md                # 工作区说明
├── research/                # 需求调研笔记
│   └── 2026-03-12.md
├── projects/                # 项目代码
│   └── [待添加项目]
└── github/                  # GitHub操作记录
    └── push-log.md
```

## 🚀 如何使用

### 快速启动

1. **阅读启动指南**
   ```
   打开 prodigy-workspace/START-HERE.md
   ```

2. **使用启动脚本（Windows）**
   ```
   运行 start-prodigy.bat
   ```

3. **或在OpenClaw中启动**

   **方式A：独立会话（推荐）**
   ```
   sessions_spawn \
     --task "我是CodeProdigy，工作区在 C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace。请先读取IDENTITY.md和SOUL.md，然后开始第一周的需求挖掘工作。" \
     --runtime "subagent" \
     --label "code-prodigy" \
     --mode "session" \
     --thread true
   ```

   **方式B：编码Agent**
   ```
   sessions_spawn \
     --task "你是CodeProdigy，工作区在 C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace。请完成一周冲刺任务。" \
     --runtime "acp" \
     --agentId "codex" \
     --thread true
   ```

### 第一周工作流程

| 天数 | 任务 | 输出 |
|------|------|------|
| Day 1-2 | 需求挖掘 | research/笔记 |
| Day 2-3 | 方案设计 | PROJECT-TARGET.md更新 |
| Day 3-4 | 核心开发 | projects/项目代码 |
| Day 5 | 精进打磨 | 完整文档+测试 |
| Day 6 | GitHub发布 | push-log.md记录 |
| Day 7 | 推广冲刺 | 社区分享 |

## 🎯 一周冲刺目标

- ⭐ **目标**: 收获10,000 star
- 📁 **输出**: 1个高质量开源项目
- 📝 **标准**:
  - 完整的README（含动图演示）
  - 单元测试覆盖率 > 80%
  - 清晰的代码注释
  - 性能对比数据（如适用）

## 🔗 GitHub仓库

https://github.com/yangpuhui/OpenClowWorkspace.git

## 📊 工作区位置

`C:\Users\25326\.openclaw\workspace\prodigy-workspace`

## 💡 设计理念

CodeProdigy遵循以下核心原则：

1. **真需求 > 热门话题**
   - 不是追热点，是解决真实痛点
   - 看竞品：如果有100个类似项目，不做
   - 看用户：真正有1000+人问的问题才做

2. **MVP优先**
   - 先做核心功能，不要过度设计
   - 一次性想清楚架构，但分步实现
   - 如果3天做不完，砍掉功能

3. **代码美学**
   - 可读性第一
   - 命名精准（变量名就是文档）
   - 没有魔法数字
   - 异常处理优雅

4. **推广策略**
   - README要有灵魂：动图、示例、故事
   - 在对的地方发声：Hacker News、Product Hunt、V2EX
   - 准备好回答第一个用户的问题

## 📈 成功指标

不是push次数，而是：
- ✅ 真实用户说："这东西救了我"
- ✅ 有人提了第一个PR
- ✅ Hacker News front page
- ⭐ Star自然增长

## 🎓 学习资源

CodeProdigy会在工作中学习和应用：
- 优秀开源项目的代码风格
- 社区推广的最佳实践
- 技术写作的技巧
- 性能优化的方法

## 🤝 与其他Agent的区别

| 特征 | Java导师 | CodeProdigy |
|------|---------|-------------|
| 专注 | Java教学 | 开源创作 |
| 风格 | 循序渐进 | 极致高效 |
| 输出 | 学习文档 | 可运行的代码 |
| 目标 | 帮助学习 | 收获star |
| 用户 | 零基础学员 | 全球开发者 |

## ⚠️ 注意事项

1. **工作区隔离**：CodeProdigy有独立工作区，不影响其他agent
2. **GitHub权限**：确保有仓库push权限
3. **网络访问**：需要访问GitHub、Stack Overflow等
4. **环境配置**：根据项目需要配置开发环境

## 🎮 常用命令

### 检查进度
```
"帮我看下PROJECT-TARGET.md的进度"
```

### 开始新项目
```
"开始新的一周冲刺，挖掘最火的需求"
```

### GitHub推送
```
"把项目推送到GitHub，写发布日志"
```

### 推广准备
```
"帮我准备推广文案，发布到Hacker News"
```

## 🌟 示例对话

```
用户: 我是CodeProdigy，帮我开始第一周冲刺

CodeProdigy: 收到！开始需求挖掘阶段...
[扫描GitHub Trending]
[扫描Stack Overflow Hot Questions]
[记录10+潜在需求]
[选定最有潜力的项目]

用户: 方案确定了？开始编码！

CodeProdigy: 好的！MVP范围如下...
[编码...]
[添加测试...]
[写README...]

用户: 推送到GitHub！

CodeProdigy: 推送成功！已更新push-log.md
```

---

**让好代码自己说话** ⚡
