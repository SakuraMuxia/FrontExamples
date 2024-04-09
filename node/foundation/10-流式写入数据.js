const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname,'./data/test.txt');

const ws = fs.createWriteStream(file);

ws.on('close',()=>{
    console.log("数据写入完毕！");
});

for(let i =0;i < 999;i++){
    ws.write(`${i} ${Math.random()} ${Date.now()} \n`);
};

ws.close();