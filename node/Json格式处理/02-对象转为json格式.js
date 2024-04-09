// 导入
const fs = require('fs');
const path = require('path');
const url = require('url');

const siteAddress = 'https://learn.fuming.site:8888/front-end/node/add.html?name=xiaol&age=101#nav';
const filename = path.resolve(__dirname,'./data/kano.json');

// 将url解析为对象
const urlObj = url.parse(siteAddress);

// 将对象转为json格式
const jsonStr = JSON.stringify(urlObj);

// 将json字符串写入文件
fs.writeFile(filename,jsonStr,err=>{
    if(err){
        console.log('error');
    }else{
        console.log('success!');
    }
});