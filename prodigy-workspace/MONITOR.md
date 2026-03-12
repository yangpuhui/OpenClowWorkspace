# CodeProdigy 状态监控

> 实时查看CodeProdigy的工作状态 ⚡

## 快速查看状态

### 方式1：使用批处理脚本（推荐Windows用户）

1. 双击运行 `monitor.bat`
2. 选择监控模式：
   - 1: 查看当前状态（一次性）
   - 2: 实时监控（每60秒）
   - 3: 实时监控（每30秒）
   - 4: 实时监控（每10秒）

### 方式2：使用命令行

```bash
# 查看当前状态
cd C:\Users\25326\.openclaw\workspace\prodigy-workspace
node scripts/monitor.js

# 实时监控（每60秒刷新）
node scripts/monitor.js --watch

# 实时监控（自定义间隔，例如每30秒）
node scripts/monitor.js --watch --interval=30000
```

### 方式3：查看工作日志

```bash
# 查看完整工作日志
notepad C:\Users\25326\.openclaw\workspace\prodigy-workspace\work-log.md

# 查看项目进度
notepad C:\Users\25326\.openclaw\workspace\prodigy-workspace\PROJECT-TARGET.md

# 查看每日报告
notepad C:\Users\25326\.openclaw\workspace\prodigy-workspace\daily-reports\YYYY-MM-DD.md
```

### 方式4：通过OpenClaw命令

```bash
# 查看Cron任务列表
openclaw cron list

# 检查tokens使用情况
session_status
```

---

## 监控输出示例

```
============================================================
  CodeProdigy 工作状态
============================================================

🕐 检查时间: 2026-03-12 13:25:00

⚡ 工作模式:
   状态: 🔥 持续工作模式（不检查tokens）
   心跳: 每4小时
   汇报: 每天10:00

📊 项目进度:
   ✅ Phase 1: 需求挖掘 - 完成
   ✅ Phase 2: 方案设计 - 完成
   🔄 Phase 3: 核心开发 - 进行中
   ⏸️ Phase 4: 精进打磨 - 待开始
   ⏸️ Phase 5: GitHub发布 - 待开始
   ⏸️ Phase 6: 推广冲刺 - 待开始

📝 最新工作:
   🚀 完成Express服务器开发（server.js）
   ⚙️ 创建配置文件（autodoc.config.js）
   👀 完成文件监听器（FileWatcher.js）
   📝 创建示例Python项目（examples/app.py）
   🔄 后端核心功能100%完成

============================================================
```

---

## 状态文件位置

| 文件 | 路径 | 说明 |
|------|------|------|
| 工作日志 | `work-log.md` | 详细的开发日志 |
| 项目进度 | `PROJECT-TARGET.md` | 当前冲刺目标 |
| 每日报告 | `daily-reports/YYYY-MM-DD.md` | 每日工作总结 |
| 需求分析 | `research/2026-03-12-demand-analysis.md` | 需求调研结果 |
| 方案设计 | `research/autodoc-design.md` | AutoDoc设计方案 |

---

## Cron任务状态

### 查看Cron任务

```bash
openclaw cron list
```

**当前运行的任务**：
1. **prodigy-continuous-work** - 每4小时工作心跳
2. **prodigy-daily-report** - 每天10:00汇报
3. **每日技术博客生成** - 每天22:00

### 手动触发工作

```bash
# 触发持续工作心跳
openclaw cron run --id 722b8898-eb1f-450d-9f4b-0d49628a69a6

# 触发每日汇报
openclaw cron run --id e4145c74-86b3-41dd-b131-ace15d67d4d3
```

---

## 如何确保CodeProdigy始终工作

### 1. 检查Cron任务状态

```bash
openclaw cron list
```

确保 `prodigy-continuous-work` 任务状态为 `enabled: true`。

### 2. 查看心跳日志

检查Cron任务是否正常运行：
- `nextRunAtMs` - 下次运行时间
- `runningAtMs` - 当前运行时间（如果有）

### 3. 检查工作日志

```bash
# 打开工作日志查看最新记录
notepad C:\Users\25326\.openclaw\workspace\prodigy-workspace\work-log.md
```

查看是否有新的工作记录，如果有更新说明CodeProdigy正在工作。

### 4. 检查文件修改时间

```powershell
# 查看工作日志最后修改时间
Get-Item C:\Users\25326\.openclaw\workspace\prodigy-workspace\work-log.md | Select-Object LastWriteTime
```

如果修改时间最近（几小时内），说明CodeProdigy在工作。

---

## 故障排查

### 问题：Cron任务不运行

**解决方案**：
```bash
# 1. 检查任务是否存在
openclaw cron list

# 2. 查看任务详情
openclaw cron list | findstr prodigy

# 3. 如果任务不存在，重新创建
openclaw cron add \
  --name "prodigy-continuous-work" \
  --schedule '{"everyMs":14400000}' \
  --payload '{"kind":"agentTurn","message":"CodeProdigy工作心跳..."}' \
  --sessionTarget "isolated"
```

### 问题：工作日志没有更新

**可能原因**：
1. Cron任务未运行
2. tokens耗尽（但我们已配置不检查）
3. OpenClaw服务未运行

**解决方案**：
```bash
# 1. 手动触发工作心跳
openclaw cron run --id 722b8898-eb1f-450d-9f4b-0d49628a69a6

# 2. 检查OpenClaw状态
openclaw status

# 3. 查看会话列表
sessions_list
```

---

## 推荐监控方式

### Windows用户

**推荐使用批处理脚本**：
1. 双击 `monitor.bat`
2. 选择选项4（实时监控，每10秒刷新）
3. 让监控窗口一直运行

### 自动监控（PowerShell）

创建一个定时任务，每5分钟检查一次状态：

```powershell
# 创建定时任务脚本
$Action = New-ScheduledTaskAction -Execute "node" -Argument "C:\Users\25326\.openclaw\workspace\prodigy-workspace\scripts\monitor.js > C:\Users\25326\.openclaw\workspace\prodigy-workspace\monitor-log.txt"
$Trigger = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5)
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "CodeProdigy-Monitor" -Action $Action -Trigger $Trigger -Settings $Settings
```

---

## 快捷命令

创建桌面快捷方式：

1. 右键桌面 → 新建 → 快捷方式
2. 位置：`C:\Users\25326\.openclaw\workspace\prodigy-workspace\monitor.bat`
3. 名称：CodeProdigy监控器
4. 完成

双击快捷方式即可快速查看状态！

---

**现在你可以随时看到CodeProdigy的工作状态了！** ⚡
