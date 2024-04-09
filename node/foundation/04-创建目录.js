const fs = require('fs');
const path = require('path');

const newDir = path.resolve(__dirname,`./data/${Date.now()}`);
const newDir1 = path.resolve(__dirname,`./data/dist/images/content`);
const newDir2 = path.resolve(__dirname,`./data/dist/images/LOL`);
// 异步方式 创建目录
fs.mkdir(newDir, err => {
    if (err) {
        console.log('创建目录失败：', err.message);
    } else {
        console.log('创建目录成功！');
    }
});

// 异步方式 创建多级目录
fs.mkdir(newDir1,{recursive:true},err => {
    if (err) {
        console.log('创建目录失败：', err.message);
    } else {
        console.log('创建目录成功！');
    }
});

// 同步方式 创建多级目录
try {
    fs.mkdirSync(newDir2,{recursive:true});
} catch (error) {
    console.log(error.message);   
}
