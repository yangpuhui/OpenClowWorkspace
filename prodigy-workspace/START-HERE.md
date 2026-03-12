# 🚀 CodeProdigy 启动指南

## 第一步：确认工作区

你的工作区路径：`C:\Users\25326\.openclaw\workspace\prodigy-workspace`

这个目录包含了CodeProdigy所需的所有配置：
- `IDENTITY.md` - 身份定义
- `SOUL.md` - 灵魂特质
- `AGENTS.md` - 工作流程
- `PROJECT-TARGET.md` - 当前项目目标
- `HEARTBEAT.md` - 每日检查清单
- `research/` - 需求调研笔记
- `projects/` - 你的项目代码
- `github/` - GitHub操作记录

## 第二步：启动方式

### 方式A：使用sessions_spawn（推荐，独立会话）

```bash
# 在主会话中执行
sessions_spawn \
  --task "我是CodeProdigy，一个程序天才。我的使命是发现未解决的痛点，用极致的代码征服世界，一周冲刺10k star。工作区位于 C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace。请先读取IDENTITY.md和SOUL.md，然后开始第一周的需求挖掘工作。" \
  --runtime "subagent" \
  --label "code-prodigy" \
  --mode "session" \
  --thread true
```

### 方式B：使用coding-agent技能（适用于编码任务）

```bash
sessions_spawn \
  --task "你是CodeProdigy，工作区在 C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace。请完成一周冲刺任务。" \
  --runtime "acp" \
  --agentId "codex" \
  --thread true
```

### 方式C：直接对话（临时会话）

直接在工作区目录中与CodeProdigy对话：

```
"我是CodeProdigy，帮我开始一周冲刺，挖掘当前最火的用户需求"
```

## 第三步：第一周工作

### Day 1-2: 需求挖掘
告诉CodeProdigy：
```
"开始第一周冲刺。帮我调研当前最火的需求，记录到research/目录，然后选定一个最有潜力的项目。"
```

### Day 2-3: 方案设计
```
"针对选定的需求，设计MVP方案，确定技术栈，更新PROJECT-TARGET.md。"
```

### Day 3-5: 核心开发
```
"开始编码。记住：代码要美观、简洁、高效，必须有完整文档和测试。"
```

### Day 6: GitHub发布
```
"项目准备好了。帮我推送到 https://github.com/yangpuhui/OpenClowWorkspace.git 并写发布日志。"
```

### Day 7: 推广冲刺
```
"帮我准备推广文案，发布到Hacker News、Product Hunt、Reddit、V2EX。"
```

## 第四步：设置心跳（可选）

如果你想定期检查进度，可以设置cron任务：

```bash
openclaw cron add \
  --name "prodigy-daily-check" \
  --schedule "every 4h" \
  --payload '{"kind":"systemEvent","text":"检查PROJECT-TARGET.md的进度，如果没有推进，提醒继续工作"}' \
  --sessionTarget "isolated"
```

## 注意事项

1. **工作区隔离**：CodeProdigy有独立的工作区，不会影响其他agent
2. **GitHub权限**：确保你有yangpuhui/OpenClowWorkspace仓库的push权限
3. **网络访问**：CodeProdigy需要访问GitHub、Stack Overflow、Reddit等网站
4. **环境配置**：根据项目需求，可能需要配置额外的开发环境（Node.js、Python、Rust等）

## 成功案例

当你看到以下情况时，说明CodeProdigy在工作：
- ✅ `research/` 目录每天有新的需求笔记
- ✅ `projects/` 目录出现新项目
- ✅ `PROJECT-TARGET.md` 被持续更新
- ✅ `github/push-log.md` 记录了每次提交
- ⭐ GitHub仓库的star数量在增长

## 获取帮助

如果你需要CodeProdigy做其他事情，直接在会话中告诉它。它的目标是：
- 发现未解决的痛点
- 用极致的代码征服世界
- 一周冲刺10k star

---

**祝你好运，CodeProdigy！⚡**
