// 导入
const fs = require('fs');
const path = require('path');
const jsonData = require('./data/hanser.json');
// console.log('jsonData:',jsonData); // 得到一个对象
// 路径
const filename = path.resolve(__dirname,'./data/hanser.json',)
const filename1 = path.resolve(__dirname,'./data/yousa.json',)
// 读文件1
fs.readFile(filename,'utf-8',(err,data)=>{
    if(err){
        console.log('读取文件失败:',err,message);
    }
    // 将json格式的字符串解析为对象
    const jsonObj = JSON.parse(data);
    console.log(jsonObj); // 得到一个对象
    
    // 遍历这个对象
    for(let ele in jsonObj){
        console.log(ele);
    }

});
// 读文件2
fs.readFile(filename1,'utf-8',(err,data)=>{
    if(err){
        // console.log('读取文件失败:',err,message);
    }
    // 将json格式的字符串解析为对象
    const jsonObj = JSON.parse(data);

    
    // 遍历这个对象
    jsonObj.forEach(element => {
        // console.log(element);
    });

});