const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('.git') && !dirFile.includes('dist')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('c:/Brand');
let updatedCount = 0;

files.forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.json')) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content
      .replace(/MarketMind\.studio/gi, 'marketmind.ai')
      .replace(/MarketMind AI/gi, 'MarketMind AI')
      .replace(/MarketMind AI/gi, 'MarketMind AI')
      .replace(/MarketMind_Campaign_Strategy/g, 'MarketMind_Campaign_Strategy')
      .replace(/marketmind-ai/gi, 'marketmind-ai')
      .replace(/#MarketMind/gi, '#MarketMind')
      .replace(/MarketMind/gi, 'MarketMind');

    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log(`Updated ${file}`);
      updatedCount++;
    }
  }
});

console.log(`Done. Updated ${updatedCount} files.`);
