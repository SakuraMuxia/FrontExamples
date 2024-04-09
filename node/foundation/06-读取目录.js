
const fs = require('fs');
const path = require('path');

const dirname = path.resolve(__dirname,'./data');
const dirname1 = path.resolve(__dirname,'./data');

// 异步方式读取目录
fs.readdir(dirname,(err,data)=>{
    if(err){
        console.log('读取失败:',err.errno,err.code);
    }
    for(let basename of data){
        console.log(path.resolve(dirname,basename));
    }
});
console.log('正在读取内容');

// 同步方式读取目录
const filename = fs.readdirSync(dirname1);
console.log(filename);