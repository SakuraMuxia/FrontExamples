const fs = require('fs');
const path = require('path');

const newDir1 = path.resolve(__dirname,`./data/dist/images/content`);
const newDir2 = path.resolve(__dirname,`./data/dist`);

fs.mkdir(newDir1,{recursive:true},err => {
    if (err) {
        console.log('创建目录失败：', err.message);
    } else {
        console.log('创建目录成功！');
    }
});

fs.rmdir(newDir2, {recursive: true}, err => {
    if (err) {
        console.log('删除失败：', err.message);
    } else {
        console.log('删除成功！');
    }
});