# 📅 CodeProdigy 每日汇报说明

## 汇报时间
每天早上10:00（北京时间）

## 汇报内容

### 1. 自动保存到daily-reports文件夹
- 文件名格式：`YYYY-MM-DD.md`
- 使用REPORT-TEMPLATE.md作为模板
- 自动填充所有字段

### 2. 向用户发送汇报
汇报内容应包含：
- ✅ 今日完成的工作
- ⚠️ 遇到的问题（如有）
- 📈 进度数据（Star、Issue、PR等）
- 🗓️ 明日计划
- 💡 思考与总结

### 3. 数据来源
- PROJECT-TARGET.md - 当前进度和目标
- github/push-log.md - GitHub提交记录
- research/目录 - 需求调研进度
- projects/目录 - 项目开发进度
- 实际GitHub API数据 - Star、Issue、PR数量

## 汇报格式示例

```
📊 CodeProdigy 每日进度报告 - 2026-03-12

🎯 今日目标
- 完成[项目名]核心功能开发
- 添加单元测试

✅ 今日完成
- 核心功能进度：完成80%，剩余2个模块
- 代码质量：通过CodeQL检查
- 测试覆盖：85%

⚠️ 遇到问题
- 无重大问题，按计划推进

📈 进度数据
- Star数量：1,234 ⭐ (+56)
- Issue数量：12
- PR数量：5

🗓️ 明日计划
- 完成剩余2个模块
- 性能优化
- 准备推广文案

💡 思考与总结
今日代码质量保持良好，README需要补充更多使用场景示例。

报告已保存至：daily-reports/2026-03-12.md
```

## Cron任务配置

- **执行时间**：每天10:00 (Asia/Shanghai)
- **会话目标**：main（向用户汇报）
- **任务类型**：systemEvent
- **命令内容**：触发CodeProdigy生成并汇报进度报告
