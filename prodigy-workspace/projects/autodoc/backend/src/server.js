/**
 * AutoDoc Backend Server
 * Express服务器，提供API文档生成和查询接口
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const DocGenerator = require('./generator/DocGenerator');
const FileWatcher = require('./utils/FileWatcher');

class AutoDocServer {
  constructor(config) {
    this.config = config;
    this.app = express();
    this.docGenerator = new DocGenerator(config);
    this.fileWatcher = new FileWatcher(config, this.handleFileChange.bind(this));
    this.setupMiddleware();
    this.setupRoutes();
  }

  /**
   * 处理文件变化
   * @param {string} filePath - 变化的文件路径
   */
  handleFileChange(filePath) {
    console.log(`🔄 File changed: ${path.basename(filePath)}`);
    try {
      const docs = this.docGenerator.generate();
      this.saveDocs(docs);
      console.log('✅ Documentation updated');
      // TODO: 通知前端更新（通过WebSocket）
    } catch (error) {
      console.error('Error updating docs:', error);
    }
  }

  /**
   * 设置中间件
   */
  setupMiddleware() {
    // CORS
    this.app.use(cors());

    // JSON解析
    this.app.use(express.json());

    // 静态文件（文档输出）
    if (this.config.output) {
      this.app.use('/docs', express.static(this.config.output));
    }

    // 请求日志
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  /**
   * 设置路由
   */
  setupRoutes() {
    // 健康检查
    this.app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // 获取API文档
    this.app.get('/api/docs', (req, res) => {
      try {
        const docs = this.docGenerator.generate();
        res.json(docs);
      } catch (error) {
        console.error('Error generating docs:', error);
        res.status(500).json({ error: error.message });
      }
    });

    // 重新生成文档
    this.app.post('/api/docs/generate', (req, res) => {
      try {
        const docs = this.docGenerator.generate();
        this.saveDocs(docs);
        res.json({ success: true, message: 'Documentation generated successfully' });
      } catch (error) {
        console.error('Error generating docs:', error);
        res.status(500).json({ success: false, error: error.message });
      }
    });

    // 获取配置
    this.app.get('/api/config', (req, res) => {
      res.json({
        title: this.config.title,
        version: this.config.version,
        description: this.config.description,
      });
    });

    // 404处理
    this.app.use((req, res) => {
      res.status(404).json({ error: 'Not found' });
    });

    // 错误处理
    this.app.use((err, req, res, next) => {
      console.error('Server error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
  }

  /**
   * 保存文档到文件
   * @param {Object} docs - 文档数据
   */
  saveDocs(docs) {
    if (!this.config.output) return;

    const outputPath = path.resolve(this.config.output);
    const docsFile = path.join(outputPath, 'docs.json');

    // 确保输出目录存在
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    fs.writeFileSync(docsFile, JSON.stringify(docs, null, 2), 'utf-8');
    console.log(`Documentation saved to ${docsFile}`);
  }

  /**
   * 启动服务器
   * @param {number} port - 端口号
   * @returns {Promise<void>}
   */
  async start(port) {
    return new Promise((resolve, reject) => {
      try {
        const server = this.app.listen(port, () => {
          console.log(`🚀 AutoDoc server is running on http://localhost:${port}`);
          console.log(`📚 API endpoint: http://localhost:${port}/api/docs`);
          console.log(`💚 Health check: http://localhost:${port}/health`);

          // 启动文件监听器
          if (this.config.watch) {
            this.fileWatcher.start();
          }

          resolve();
        });

        this.server = server;

        server.on('error', (error) => {
          if (error.code === 'EADDRINUSE') {
            reject(new Error(`Port ${port} is already in use`));
          } else {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 停止服务器
   * @returns {Promise<void>}
   */
  async stop() {
    return new Promise((resolve) => {
      // 停止文件监听器
      if (this.fileWatcher) {
        this.fileWatcher.stop();
      }

      if (this.server) {
        this.server.close(() => {
          console.log('🛑 AutoDoc server stopped');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = AutoDocServer;

// 如果直接运行此文件，启动服务器
if (require.main === module) {
  // 尝试加载配置文件
  let config;

  try {
    // 查找 autodoc.config.js 文件
    const configPaths = [
      path.join(__dirname, '../../autodoc.config.js'),  // 从 backend/src/ 向上两级到项目根目录
      path.join(process.cwd(), 'autodoc.config.js'),     // 当前工作目录
    ];

    for (const configPath of configPaths) {
      if (fs.existsSync(configPath)) {
        console.log(`Loading config from: ${configPath}`);
        config = require(configPath);
        break;
      }
    }

    if (!config) {
      console.warn('No config file found, using defaults');
      config = {};
    }
  } catch (error) {
    console.error('Error loading config:', error.message);
    config = {};
  }

  // 合并环境变量配置（环境变量优先级最高）
  const finalConfig = {
    entry: process.env.ENTRY_FILE || config.entry || './app.py',
    output: process.env.OUTPUT_DIR || config.output || './docs',
    title: process.env.API_TITLE || config.title || 'API Documentation',
    version: process.env.API_VERSION || config.version || '1.0.0',
    description: process.env.API_DESCRIPTION || config.description || '',
    port: process.env.PORT || config.port || 3000,
    watch: process.env.WATCH !== 'false' && (config.watch !== false),
  };

  const server = new AutoDocServer(finalConfig);

  server.start(config.port).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

  // 优雅退出
  process.on('SIGINT', async () => {
    console.log('\n👋 Shutting down gracefully...');
    await server.stop();
    process.exit(0);
  });
}
