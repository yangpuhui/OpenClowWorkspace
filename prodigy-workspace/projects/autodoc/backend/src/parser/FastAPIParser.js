/**
 * Python FastAPI Parser
 * 从Python FastAPI代码中提取API信息
 */

const fs = require('fs');
const path = require('path');

class FastAPIParser {
  constructor() {
    this.apis = [];
  }

  /**
   * 解析Python文件
   * @param {string} filePath - Python文件路径
   * @returns {Array} API列表
   */
  parse(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    this.apis = [];

    console.log(`[Parser] File content length: ${content.length}`);

    // 查找所有路由装饰器
    const routePatterns = [
      /@app\.get\("([^"]+)"\)/g,
      /@app\.post\("([^"]+)"\)/g,
      /@app\.put\("([^"]+)"\)/g,
      /@app\.delete\("([^"]+)"\)/g,
    ];

    routePatterns.forEach(pattern => {
      let match;
      let matchCount = 0;
      let method = 'unknown';
      while ((match = pattern.exec(content)) !== null) {
        matchCount++;
        method = match[0].match(/app\.(\w+)/)[1].toUpperCase();
        const routePath = match[1];

        console.log(`[Parser] Found ${method} route: ${routePath}`);

        // 提取函数定义（从装饰器之后开始）
        const decoratorEnd = match.index + match[0].length;
        const funcMatch = this.findFunctionDefinition(content, decoratorEnd);
        if (funcMatch) {
          const api = {
            id: this.generateId(method, routePath),
            method,
            path: routePath,
            summary: this.extractSummary(funcMatch.funcDef),
            description: this.extractDescription(funcMatch.funcDef),
            parameters: this.extractParameters(funcMatch.funcDef),
            responses: this.extractResponses(funcMatch.funcDef),
            tags: this.extractTags(routePath),
          };
          this.apis.push(api);
          console.log(`[Parser] API parsed: ${method} ${routePath}`);
        } else {
          console.log(`[Parser] Failed to find function definition for ${routePath}`);
        }
      }

      if (matchCount > 0) {
        console.log(`[Parser] Pattern matched ${matchCount} times for ${method}`);
      }
    });

    console.log(`[Parser] Total APIs parsed: ${this.apis.length}`);
    return this.apis;
  }

  /**
   * 查找函数定义
   * @param {string} content - 文件内容
   * @param {number} startIndex - 开始索引
   * @returns {Object} 函数信息
   */
  findFunctionDefinition(content, startIndex) {
    // 跳过装饰器后的空白行，找到函数定义
    const remainingContent = content.slice(startIndex);
    const asyncMatch = remainingContent.match(/^\s*async\s+def\s+(\w+)\([^)]*\):/);
    const defMatch = remainingContent.match(/^\s*def\s+(\w+)\([^)]*\):/);

    const match = asyncMatch || defMatch;
    if (!match) return null;

    // 提取函数体（简单的缩进匹配）
    const funcStart = startIndex + match.index;
    const funcEnd = this.findFunctionEnd(content, funcStart);
    const funcDef = content.slice(funcStart, funcEnd);

    return {
      name: match[1],
      funcDef,
    };
  }

  /**
   * 查找函数结束位置
   * @param {string} content - 文件内容
   * @param {number} funcStart - 函数开始位置
   * @returns {number} 函数结束位置
   */
  findFunctionEnd(content, funcStart) {
    const lines = content.slice(funcStart).split('\n');
    const baseIndent = this.getIndent(lines[0]);
    let endLine = 1;

    for (; endLine < lines.length; endLine++) {
      const line = lines[endLine];
      if (line.trim() === '' || line.startsWith('#')) continue;
      if (this.getIndent(line) <= baseIndent && line.trim() !== '') {
        break;
      }
    }

    return funcStart + lines.slice(0, endLine).join('\n').length;
  }

  /**
   * 获取行缩进
   * @param {string} line - 行内容
   * @returns {number} 缩进数量
   */
  getIndent(line) {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  }

  /**
   * 提取摘要
   * @param {string} funcDef - 函数定义
   * @returns {string} 摘要
   */
  extractSummary(funcDef) {
    const docstringMatch = funcDef.match(/"""([^"]+)"/);
    if (docstringMatch) {
      const lines = docstringMatch[1].split('\n');
      return lines[0].trim();
    }
    return '';
  }

  /**
   * 提取描述
   * @param {string} funcDef - 函数定义
   * @returns {string} 描述
   */
  extractDescription(funcDef) {
    const docstringMatch = funcDef.match(/"""([^"]+)"""/);
    if (docstringMatch) {
      const lines = docstringMatch[1].split('\n').filter(line => line.trim());
      if (lines.length > 1) {
        return lines.slice(1).join('\n').trim();
      }
    }
    return '';
  }

  /**
   * 提取参数
   * @param {string} funcDef - 函数定义
   * @returns {Array} 参数列表
   */
  extractParameters(funcDef) {
    const params = [];

    // 提取路径参数
    const pathMatch = funcDef.match(/def\s+\w+\(([^)]+)\):/);
    if (pathMatch) {
      const paramList = pathMatch[1].split(',').map(p => p.trim());
      paramList.forEach(param => {
        const [name, type] = param.split(':').map(p => p.trim());
        if (name && !name.startsWith('self')) {
          params.push({
            name,
            type: type || 'any',
            required: !param.includes('='),
            location: 'path',
            description: '',
          });
        }
      });
    }

    // TODO: 提取请求体参数（需要更复杂的解析）

    return params;
  }

  /**
   * 提取响应
   * @param {string} funcDef - 函数定义
   * @returns {Array} 响应列表
   */
  extractResponses(funcDef) {
    // 简化处理，默认返回200响应
    return [
      {
        statusCode: 200,
        description: 'Success',
        example: null,
      },
    ];
  }

  /**
   * 提取标签
   * @param {string} routePath - 路由路径
   * @returns {Array} 标签列表
   */
  extractTags(routePath) {
    const segments = routePath.split('/').filter(s => s && !s.startsWith('{'));
    return segments.length > 0 ? [segments[0]] : ['default'];
  }

  /**
   * 生成API ID
   * @param {string} method - HTTP方法
   * @param {string} path - 路径
   * @returns {string} API ID
   */
  generateId(method, path) {
    return `${method.toLowerCase()}-${path.replace(/\//g, '-').replace(/[{}]/g, '')}`;
  }
}

module.exports = FastAPIParser;
