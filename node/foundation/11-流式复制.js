const fs = require('fs');
const path = require('path');

// 文件地址
const originFile = path.resolve(__dirname,'./data/test.txt');
const targetFile = path.resolve(__dirname,'./data/hanser.txt');

// 创建读取流
const rs = fs.createReadStream(originFile);
// 创建写入流
const ws = fs.createWriteStream(targetFile);

// 监听事件
rs.on('data',chunk=>{
    ws.write(chunk);
});

rs.on('end',()=>{
    console.log("流式复制完毕");
});