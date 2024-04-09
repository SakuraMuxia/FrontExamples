// 引入
const fs = require('fs');
const path = require('path');

// 路径
const filename = path.join(__dirname,'./data/test.txt');
console.log(filename);

// 异步方式读取文件
fs.readFile(filename, 'utf-8',(err,data) => {
    if(err){
        console.log('文件读取失败:',err.errno,err.code);
        return;
    }
    console.log(data);
    console.log('异步读取文件结束');
});
console.log('开始异步读取文件');

console.log('-------------------');

// 同步方式读取文件
try {
    const fsData = fs.readFileSync(filename,'utf-8');
    console.log('同步读取文件',fsData);
} catch (error) {
    console.log('文件读取失败',error.errno,error.code);
}
console.log('开始同步读取文件');
console.log('-------------------');