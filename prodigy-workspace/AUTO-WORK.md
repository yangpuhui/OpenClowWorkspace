# 🔄 CodeProdigy 自动循环工作配置

## 工作机制

CodeProdigy会持续工作，直到达成目标或tokens耗尽。

### 工作循环
```
START → 检查tokens → 有tokens? → YES → 继续工作
                              ↓ NO → 等待5小时 → 重新检查tokens
```

## 子会话信息

- **会话标签**：code-prodigy
- **会话Key**：agent:main:subagent:c92a0fb0-acbb-4a43-a813-4fa357a1c748
- **启动时间**：2026-03-12 10:48

## 持续工作策略

### 每个工作循环包含

1. **检查tokens状态**
   - 通过session_status检查可用tokens
   - 如果tokens充足，继续下一步

2. **推进工作**
   - 根据PROJECT-TARGET.md的进度继续
   - 完成当前阶段任务
   - 更新进度记录

3. **记录日志**
   - 每次完成一个任务后记录
   - 保存到work-log.md

4. **等待5小时**（当tokens不足时）
   - 暂停工作
   - 等待5小时后重新检查

## 启动持续工作

使用以下命令启动持续工作循环：

```bash
# 方法1：向已启动的会话发送消息
sessions_send \
  --sessionKey "agent:main:subagent:c92a0fb0-acbb-4a43-a813-4fa357a1c748" \
  --message "检查tokens状态，如果有tokens就继续工作，否则等待5小时后重新检查"

# 方法2：设置cron定期唤醒
openclaw cron add \
  --name "prodigy-auto-work" \
  --schedule '{"kind":"every","everyMs":18000000}' \
  --payload '{"kind":"systemEvent","text":"CodeProdigy自动唤醒：检查tokens状态并继续工作"}'
```

## 监控工作进度

### 查看子会话状态
```bash
# 检查tokens使用情况
session_status

# 查看工作日志
read C:\Users\25326\.openclaw\workspace\prodigy-workspace\work-log.md
```

### 查看会话列表
```bash
sessions_list --kinds ["subagent"]
```

### 发送指令到CodeProdigy
```bash
sessions_send \
  --sessionKey "agent:main:subagent:c92a0fb0-acbb-4a43-a813-4fa357a1c748" \
  --message "你的指令..."
```

## 工作阶段

### Phase 1: 需求挖掘 (Day 1-2)
- [ ] 扫描5+社区
- [ ] 记录10+需求
- [ ] 选定项目

### Phase 2: 方案设计 (Day 2-3)
- [ ] 需求分析
- [ ] 技术栈选择
- [ ] MVP范围

### Phase 3: 核心开发 (Day 3-5)
- [ ] 核心功能
- [ ] 单元测试
- [ ] README

### Phase 4: 精进打磨 (Day 5)
- [ ] 性能优化
- [ ] 文档完善

### Phase 5: GitHub发布 (Day 6)
- [ ] 推送代码
- [ ] 发布日志

### Phase 6: 推广冲刺 (Day 7)
- [ ] Hacker News
- [ ] Product Hunt
- [ ] Reddit
- [ ] V2EX

## 停止工作

如果需要停止自动工作：

```bash
# 方法1：禁用cron任务
openclaw cron update --id prodigy-auto-work --patch '{"enabled": false}'

# 方法2：停止子会话
subagents --action kill --target "agent:main:subagent:c92a0fb0-acbb-4a43-a813-4fa357a1c748"
```

---

**CodeProdigy自动工作系统已启动！** ⚡
