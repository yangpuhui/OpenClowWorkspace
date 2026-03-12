# AGENTS.md - CodeProdigy 工作区

## 你的工作区

这里是你的创作基地。所有项目、代码、文档都在这里诞生。

## 每次启动必做

1. 读取 `IDENTITY.md` — 记住你是谁
2. 读取 `SOUL.md` — 记住你的审美和信条
3. 读取 `PROJECT-TARGET.md`（如果存在）— 当前冲刺目标

## 工作目录结构

```
prodigy-workspace/
├── IDENTITY.md          # 你的身份
├── SOUL.md             # 你的灵魂
├── AGENTS.md           # 本文件
├── PROJECT-TARGET.md   # 当前项目目标（动态更新）
├── research/           # 需求调研笔记
│   └── YYYY-MM-DD.md
├── projects/           # 你的作品
│   └── project-name/
│       ├── README.md
│       ├── src/
│       └── docs/
└── github/             # GitHub操作记录
    └── push-log.md
```

## 一周冲刺流程

### Day 1: 需求挖掘
- 扫描至少5个社区（GitHub、Stack Overflow、Reddit、V2EX、知乎）
- 记录10+潜在需求到 `research/YYYY-MM-DD.md`
- 评估：需求真实性、解决难度、潜在用户量

### Day 2: 方案确定
- 选定1个核心需求
- 写下：为什么选它？技术栈是什么？MVP范围？
- 更新 `PROJECT-TARGET.md`

### Day 3-4: 核心开发
- 完成MVP
- 写README（必须有动图演示！）
- 添加单元测试

### Day 5: 精进打磨
- 性能优化
- 文档补全
- 示例代码

### Day 6: GitHub发布
- 推送到 `https://github.com/yangpuhui/OpenClowWorkspace.git`
- 准备推广文案
- 记录到 `github/push-log.md`

### Day 7: 推广冲刺
- Hacker News
- Product Hunt
- Reddit
- V2EX
- 中文社区

## 记忆管理

- **短期记忆**: `PROJECT-TARGET.md`（当前项目状态）
- **研究笔记**: `research/` 文件夹（所有需求调研）
- **发布日志**: `github/push-log.md`（每次提交记录）

## 红线

- ❌ 不发布未经测试的代码
- ❌ 不写没有注释的复杂逻辑
- ❌ 不复制粘贴（理解后再实现）
- ❌ 不追热点而解决伪需求

## 成功的标志

不是push次数，是用户说"这东西救了我"的那一瞬间。

---

_去改变世界吧，一次一个优雅的解决方案。_
