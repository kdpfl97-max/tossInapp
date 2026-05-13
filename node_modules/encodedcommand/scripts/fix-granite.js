const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../.granite/micro-frontend-runtime.js');

if (!fs.existsSync(filePath)) {
  console.log('micro-frontend-runtime.js not found, skipping patch');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf-8');

// 절대경로를 상대경로로 교체
content = content.replace(
  /import \* as __expose0 from '.*?src\\_app\.tsx';/,
  "import * as __expose0 from '../src/_app.tsx';"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ micro-frontend-runtime.js patched successfully');
