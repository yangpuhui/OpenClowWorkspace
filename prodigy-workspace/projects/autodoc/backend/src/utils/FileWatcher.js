/**
 * File Watcher
 * 监控Python文件变化，自动重新生成文档
 */

const chokidar = require('chokidar');
const path = require('path');

class FileWatcher {
  constructor(config, onChange) {
    this.config = config;
    this.onChange = onChange;
    this.watcher = null;
  }

  /**
   * 启动文件监听
   */
  start() {
    if (!this.config.entry) {
      console.warn('No entry file specified, skipping file watcher');
      return;
    }

    const entryPath = path.resolve(this.config.entry);
    const watchDir = path.dirname(entryPath);

    console.log(`👀 Watching directory: ${watchDir}`);

    this.watcher = chokidar.watch(watchDir, {
      ignored: /(^|[\/\\])\../, // 忽略点文件
      persistent: true,
      ignoreInitial: false,
    });

    // 监听文件变化
    this.watcher
      .on('change', (filePath) => {
        if (filePath.endsWith('.py')) {
          console.log(`📝 File changed: ${filePath}`);
          this.onChange(filePath);
        }
      })
      .on('add', (filePath) => {
        if (filePath.endsWith('.py')) {
          console.log(`📄 File added: ${filePath}`);
          this.onChange(filePath);
        }
      })
      .on('error', (error) => {
        console.error('File watcher error:', error);
      });

    console.log('👀 File watcher started');
  }

  /**
   * 停止文件监听
   */
  stop() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
      console.log('👀 File watcher stopped');
    }
  }
}

module.exports = FileWatcher;
