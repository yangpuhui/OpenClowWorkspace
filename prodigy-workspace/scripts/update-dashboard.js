/**
 * 自动更新仪表板数据
 * 从work-log.md和PROJECT-TARGET.md读取数据并更新dashboard.html
 */

const fs = require('fs');
const path = require('path');

class DashboardUpdater {
  constructor() {
    this.workspace = 'C:\\Users\\25326\\.openclaw\\workspace\\prodigy-workspace';
    this.workLogFile = path.join(this.workspace, 'work-log.md');
    this.targetFile = path.join(this.workspace, 'PROJECT-TARGET.md');
    this.dashboardFile = path.join(this.workspace, 'dashboard.html');
  }

  /**
   * 读取进度数据
   */
  readProgress() {
    try {
      const content = fs.readFileSync(this.targetFile, 'utf-8');
      const phases = [];
      let currentPhase = '';

      const lines = content.split('\n');
      lines.forEach(line => {
        if (line.startsWith('### Phase')) {
          const match = line.match(/Phase (\d+): (.+) - (.+)/);
          if (match) {
            currentPhase = {
              number: parseInt(match[1]),
              name: match[2],
              status: match[3].trim()
            };
            phases.push(currentPhase);
          }
        }
      });

      return phases;
    } catch (error) {
      console.error('Error reading progress:', error);
      return [];
    }
  }

  /**
   * 读取最新工作日志
   */
  readLatestLog() {
    try {
      const content = fs.readFileSync(this.workLogFile, 'utf-8');
      const sections = content.split('### 20');

      if (sections.length > 1) {
        const latestLog = sections[1].split('###')[0];
        return latestLog.trim();
      }
      return '';
    } catch (error) {
      console.error('Error reading work log:', error);
      return '';
    }
  }

  /**
   * 更新仪表板
   */
  updateDashboard() {
    const phases = this.readProgress();
    const latestLog = this.readLatestLog();

    console.log('\n📊 CodeProdigy 状态看板');
    console.log('='.repeat(50));

    // 显示进度
    console.log('\n📈 项目进度:');
    phases.forEach(phase => {
      const icon = phase.status.includes('完成') ? '✅' :
                  phase.status.includes('进行中') ? '🔄' : '⏸️';
      console.log(`   ${icon} Phase ${phase.number}: ${phase.name} - ${phase.status}`);
    });

    // 显示最新工作
    console.log('\n📝 最新工作:');
    const lines = latestLog.split('\n');
    lines.forEach(line => {
      if (line.includes('- ')) {
        console.log(`   ${line.replace(/^- /, '')}`);
      }
    });

    console.log('\n🌐 仪表板地址: ' + this.dashboardFile);
    console.log('='.repeat(50) + '\n');

    return phases;
  }
}

// 命令行使用
if (require.main === module) {
  const updater = new DashboardUpdater();
  const args = process.argv.slice(2);

  if (args.includes('--watch') || args.includes('-w')) {
    const interval = parseInt(args.find(a => a.startsWith('--interval='))?.split('=')[1]) || 60000;
    console.log(`\n👀 启动自动更新（每${interval/1000}秒）`);
    console.log('按 Ctrl+C 退出\n');

    updater.updateDashboard();

    setInterval(() => {
      console.clear();
      updater.updateDashboard();
    }, interval);
  } else {
    updater.updateDashboard();
  }
}

module.exports = DashboardUpdater;
