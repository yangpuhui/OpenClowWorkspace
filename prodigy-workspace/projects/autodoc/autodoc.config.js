# AutoDoc 配置文件

module.exports = {
  // 入口文件（Python FastAPI项目的主文件）
  entry: './examples/app.py',

  // 输出目录（生成的文档保存在这里）
  output: './docs',

  // 项目信息
  title: 'AutoDoc Demo API',
  description: '示例API文档',
  version: '1.0.0',

  // 服务器配置
  port: 3000,

  // 监听配置
  watch: true,

  // UI配置
  theme: 'auto',  // light | dark | auto
};
