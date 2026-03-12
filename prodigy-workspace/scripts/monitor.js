/**
 * CodeProdigy 状态监控脚本
 * 实时查看CodeProdigy的工作状态
 */

const fs = require('fs');
const path = require('path');

class CodeProdigyMonitor {
  constructor() {
    this.workspace = 'C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace';
    this.workLogFile = path.join(this.workspace, 'work-log.md');
    this.targetFile = path.join(this.workspace, 'PROJECT-TARGET.md');
  }

  /**
   * 显示完整状态
   */
  showStatus() {
    console.log('\n' + '='.repeat(60));
    console.log('  CodeProdigy 工作状态');
    console.log('='.repeat(60));

    // 时间信息
    console.log(`\n🕐 检查时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

    // 工作模式
    console.log('\n⚡ 工作模式:');
    console.log('   状态: 🔥 持续工作模式（不检查tokens）');
    console.log('   心跳: 每4小时');
    console.log('   汇报: 每天10:00');

    // 读取进度
    this.showProgress();

    // 最新工作日志
    this.showLatestLog();

    console.log('\n' + '='.repeat(60) + '\n');
  }

  /**
   * 显示项目进度
   */
  showProgress() {
    try {
      const content = fs.readFileSync(this.targetFile, 'utf-8');
      const lines = content.split('\n');

      console.log('\n📊 项目进度:');

      // 提取各阶段进度
      let currentPhase = '';
      lines.forEach(line => {
        if (line.startsWith('### Phase')) {
          const match = line.match(/Phase \d+: (.+) - (.+)/);
          if (match) {
            currentPhase = match[1];
            const status = match[2].trim();
            const icon = status.includes('完成') ? '✅' :
                        status.includes('进行中') ? '🔄' : '⏸️';
            console.log(`   ${icon} ${currentPhase} - ${status}`);
          }
        }
      });
    } catch (error) {
      console.log('   ⚠️ 无法读取进度文件');
    }
  }

  /**
   * 显示最新工作日志
   */
  showLatestLog() {
    try {
      const content = fs.readFileSync(this.workLogFile, 'utf-8');
      const sections = content.split('### 20');

      if (sections.length > 1) {
        const latestLog = sections[1].split('###')[0];
        const lines = latestLog.trim().split('\n');

        console.log('\n📝 最新工作:');
        lines.forEach((line, index) => {
          if (line.includes('- ')) {
            console.log(`   ${line.replace(/^- /, '')}`);
          }
        });
      }
    } catch (error) {
      console.log('   ⚠️ 无法读取工作日志');
    }
  }

  /**
   * 实时监控模式
   */
  async watch(interval = 60000) {
    console.log(`\n👀 启动实时监控模式（每${interval/1000}秒刷新）`);
    console.log('按 Ctrl+C 退出\n');

    this.showStatus();

    setInterval(() => {
      console.clear();
      this.showStatus();
    }, interval);
  }
}

// 命令行使用
if (require.main === module) {
  const monitor = new CodeProdigyMonitor();
  const args = process.argv.slice(2);

  if (args.includes('--watch') || args.includes('-w')) {
    const interval = parseInt(args.find(a => a.startsWith('--interval='))?.split('=')[1]) || 60000;
    monitor.watch(interval);
  } else {
    monitor.showStatus();
  }
}

module.exports = CodeProdigyMonitor;
