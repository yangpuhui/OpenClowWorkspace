/**
 * Document Generator
 * 生成API文档数据结构
 */

const fs = require('fs');
const path = require('path');
const FastAPIParser = require('../parser/FastAPIParser');

class DocGenerator {
  constructor(config) {
    this.config = config;
    this.parser = new FastAPIParser();
  }

  /**
   * 生成文档
   * @returns {Object} API文档
   */
  generate() {
    const apis = this.parseAllFiles();
    const groupedAPIs = this.groupAPIs(apis);

    return {
      title: this.config.title || 'API Documentation',
      version: this.config.version || '1.0.0',
      description: this.config.description || '',
      baseUrl: this.config.baseUrl,
      groups: groupedAPIs,
    };
  }

  /**
   * 解析所有Python文件
   * @returns {Array} API列表
   */
  parseAllFiles() {
    const apis = [];
    const entryPath = this.config.entry;

    if (!entryPath) {
      throw new Error('Entry file not specified in config');
    }

    try {
      // 解析路径：如果是相对路径，基于当前工作目录
      let absolutePath;
      if (path.isAbsolute(entryPath)) {
        absolutePath = entryPath;
      } else {
        // 基于配置文件所在目录或当前工作目录
        const basePath = process.cwd();
        absolutePath = path.resolve(basePath, entryPath);
      }

      console.log(`Parsing file: ${absolutePath}`);

      // 检查文件是否存在
      if (!fs.existsSync(absolutePath)) {
        throw new Error(`File not found: ${absolutePath}`);
      }

      const parsedAPIs = this.parser.parse(absolutePath);
      apis.push(...parsedAPIs);
    } catch (error) {
      console.error('Error parsing entry file:', error.message);
      // 返回空数组而不是抛出错误，让服务器能继续运行
      return [];
    }

    return apis;
  }

  /**
   * 按标签分组API
   * @param {Array} apis - API列表
   * @returns {Array} 分组后的API
   */
  groupAPIs(apis) {
    const groups = {};

    apis.forEach(api => {
      api.tags.forEach(tag => {
        if (!groups[tag]) {
          groups[tag] = {
            name: tag,
            apis: [],
          };
        }
        groups[tag].apis.push(api);
      });
    });

    // 排序
    return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
  }
}

module.exports = DocGenerator;
