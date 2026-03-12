# 📊 CodeProdigy 每日汇报系统

> 每天上午10:00自动汇报工作进度 ⚡

## 📁 文件夹结构

```
daily-reports/
├── README.md              # 本说明文档
├── REPORT-TEMPLATE.md     # 报告模板（自动使用）
├── INSTRUCTIONS.md        # 汇报说明
├── cron-trigger.md        # Cron任务配置说明
└── YYYY-MM-DD.md          # 每日报告（自动生成）
```

## ⏰ 自动汇报设置

### Cron任务信息

- **任务名称**：prodigy-daily-report
- **任务ID**：e4145c74-86b3-41dd-b131-ace15d67d4d3
- **执行时间**：每天10:00 (Asia/Shanghai)
- **下次执行**：2026-03-13 10:00
- **会话目标**：main（向用户汇报）

### 汇报内容

每天10:00，CodeProdigy会自动：

1. ✅ 读取 `PROJECT-TARGET.md` 查看当前进度
2. ✅ 使用 `REPORT-TEMPLATE.md` 生成报告
3. ✅ 收集今日工作数据（GitHub star、issue、pr等）
4. ✅ 保存报告到 `daily-reports/YYYY-MM-DD.md`
5. ✅ 向你发送汇报通知

## 📋 报告模板

报告包含以下内容：

- 🎯 **今日目标** - 计划完成的事项
- ✅ **今日完成** - 实际完成的工作
- ⚠️ **遇到问题** - 遇到的困难和解决方案
- 📈 **进度数据** - GitHub统计、代码统计
- 🗓️ **明日计划** - 下一步工作安排
- 💡 **思考与总结** - 经验和反思

## 🔧 Cron任务管理

### 查看任务列表
```bash
openclaw cron list
```

### 手动触发测试
```bash
openclaw cron run --id prodigy-daily-report
```

### 禁用任务
```bash
openclaw cron update --id prodigy-daily-report --patch '{"enabled": false}'
```

### 启用任务
```bash
openclaw cron update --id prodigy-daily-report --patch '{"enabled": true}'
```

### 删除任务
```bash
openclaw cron remove --id prodigy-daily-report
```

### 修改执行时间

如果想修改执行时间，需要删除后重新创建：

```bash
# 1. 删除现有任务
openclaw cron remove --id prodigy-daily-report

# 2. 重新创建（修改expr字段）
openclaw cron add \
  --name "prodigy-daily-report" \
  --schedule '{"kind":"cron","expr":"0 9 * * *","tz":"Asia/Shanghai"}' \
  --payload '{"kind":"systemEvent","text":"📊 CodeProdigy每日汇报提醒..."}' \
  --sessionTarget "main"
```

**常见Cron表达式**：
- `0 9 * * *` - 每天9:00
- `0 10 * * *` - 每天10:00
- `0 20 * * *` - 每天20:00
- `0 10 * * 1` - 每周一10:00

## 📅 每日报告示例

查看已生成的报告：
- **2026-03-12.md** - 工作区初始化完成报告

## ⚡ 快速使用

### 方式1：等待自动汇报

每天10:00自动收到汇报通知，无需手动操作。

### 方式2：手动触发

如果需要立即查看汇报：

```bash
openclaw cron run --id prodigy-daily-report
```

### 方式3：直接查看报告

打开文件夹查看历史报告：
```
C:\Users\25326\.openclaw\workspace\prodigy-workspace\daily-reports\
```

## 🎨 报告内容说明

### GitHub数据来源

报告中的GitHub数据（star、issue、pr）需要CodeProdigy通过GitHub API获取。确保：
1. 有稳定的网络连接
2. 仓库地址正确配置在PROJECT-TARGET.md中

### 进度数据来源

- `PROJECT-TARGET.md` - 目标和进度
- `github/push-log.md` - 提交记录
- `research/` - 需求调研进度
- `projects/` - 项目开发进度

## 💡 提示

1. **首次汇报**：明天（2026-03-13）上午10:00将自动生成第一份正式汇报
2. **手动测试**：随时可以用 `openclaw cron run` 手动触发测试
3. **历史记录**：所有汇报都保存在daily-reports文件夹，按日期命名
4. **备份建议**：定期备份daily-reports文件夹到GitHub或其他位置

---

**CodeProdigy每日汇报系统已就绪！** ⚡

明天上午10:00将收到第一份正式工作汇报。
