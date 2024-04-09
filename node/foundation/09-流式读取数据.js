const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname,'./data/test.txt');

// 创建文件读取流
const rs = fs.createReadStream(file);
// 事件监听到数据上
rs.on('data',chunk =>{
    console.log(chunk);
});
// 事件监听结束
rs.on('end',()=>{
    console.log('读取完毕！');
})