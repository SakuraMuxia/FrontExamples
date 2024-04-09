const fs = require('fs');
const path = require('path');

const file02 = path.resolve(__dirname,'./data/test.txt');

// 异步方式 判断文件或目录是否存下
fs.access(file02, err => {
    if (err) {
        console.log('文件不存在！');
    } else {
        console.log('文件存在！');
    }
});

// 同步方式
try {
    fs.accessSync(file02);
    console.log('文件存在！');
} catch {
    console.log('文件不存在！');
}
