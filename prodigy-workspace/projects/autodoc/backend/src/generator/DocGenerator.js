/**
 * Document Generator
 * 生成API文档数据结构
 */

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
      const parsedAPIs = this.parser.parse(entryPath);
      apis.push(...parsedAPIs);
    } catch (error) {
      console.error('Error parsing entry file:', error.message);
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
