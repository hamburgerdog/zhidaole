const path = require('path');
const fs = require('fs');

const basePath = path.resolve('./src');

//  复制现有入口文件，并导入antd.less
const createViteIndexFile = () => {
  const dataToken = fs.readFileSync(basePath + '/index.jsx', 'utf-8').split(/\r\n|\n|\r/gm);
  dataToken.splice(0, 0, "import 'antd/dist/antd.less';");
  fs.writeFileSync(basePath + '/vite-index.jsx', dataToken.join('\r\n'));
};

createViteIndexFile();
