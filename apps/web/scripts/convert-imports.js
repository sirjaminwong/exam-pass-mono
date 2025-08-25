const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 获取所有 TypeScript 和 TSX 文件
const files = glob.sync('src/**/*.{ts,tsx}', { cwd: __dirname + '/..' });

console.log(`Found ${files.length} files to process...`);

files.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 转换相对路径导入为 @ 路径
  const updatedContent = content.replace(
    /import\s+([^'"]+)\s+from\s+['"](\.\.\/[^'"]+)['"]/g,
    (match, imports, relativePath) => {
      // 计算当前文件相对于 src 的深度
      const currentDir = path.dirname(file);
      const srcRelativePath = path.relative('src', currentDir);
      const depth = srcRelativePath === '' ? 0 : srcRelativePath.split(path.sep).length;
      
      // 解析相对路径
      let targetPath = relativePath;
      
      // 移除开头的 ../
      while (targetPath.startsWith('../')) {
        targetPath = targetPath.substring(3);
      }
      
      // 构建 @ 路径
      const absolutePath = `@/${targetPath}`;
      
      return `import ${imports} from '${absolutePath}'`;
    }
  );
  
  // 如果内容有变化，写回文件
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated: ${file}`);
  }
});

console.log('Import conversion completed!');