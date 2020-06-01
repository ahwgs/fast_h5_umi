/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

function clear(url) {
  try {
    let files = [];
    if (fs.existsSync(url)) {
      files = fs.readdirSync(url);
      files.forEach(file => {
        const curPath = `${url}/${file}`;
        if (fs.statSync(curPath).isDirectory()) {
          clear(curPath); // 递归删除文件夹
        } else if (file.endsWith('.map')) {
          fs.unlinkSync(curPath); // 删除文件
        }
      });
    }
  } catch (err) {
    console.log('clear err', err);
  }
}

clear(path.join(__dirname, './dist'));
