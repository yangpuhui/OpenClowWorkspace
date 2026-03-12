# Cron任务：CodeProdigy每日汇报

## 任务信息
- **任务名称**：prodigy-daily-report
- **执行时间**：每天10:00 (Asia/Shanghai)
- **触发方式**：系统事件注入

## 设置命令

请执行以下命令设置每日汇报：

```bash
openclaw cron add \
  --name "prodigy-daily-report" \
  --schedule '{"kind":"cron","expr":"0 10 * * *","tz":"Asia/Shanghai"}' \
  --payload '{"kind":"systemEvent","text":"📊 CodeProdigy每日汇报提醒：请生成今日进度报告。任务：1)读取C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace\\PROJECT-TARGET.md查看进度；2)读取C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace\\daily-reports\\REPORT-TEMPLATE.md获取模板；3)收集今日完成的工作、遇到的问题、进度数据；4)生成报告保存到C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace\\daily-reports\\$(date +%Y-%m-%d).md；5)向我汇报今日进度。"}' \
  --sessionTarget "main"
```

## 手动触发测试

如果需要手动触发测试：

```bash
openclaw cron run --id prodigy-daily-report
```

## 查看任务列表

```bash
openclaw cron list
```

## 删除任务

```bash
openclaw cron remove --id prodigy-daily-report
```
