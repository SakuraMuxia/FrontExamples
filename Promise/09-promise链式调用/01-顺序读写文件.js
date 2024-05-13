
const fs = require('node:fs/promises');
const path = require('path');

// 第一步读取 data1.txt
fs.readFile(path.resolve(__dirname, './data/data1.txt'), 'utf-8')
.then(data=>{
    console.log('data1.txt 中的内容：');
    console.log(data);
    console.log('');
    // 第二步读取 data2.txt
    return fs.readFile(path.resolve(__dirname, './data/data2.txt'), 'utf-8');
})
.then(data => {
    console.log('data2.txt 中的内容：');
    console.log(data);
    console.log('');
    console.log('');
    
    // 第三步读取 data3.txt
    return fs.readFile(path.resolve(__dirname, './data/data3.txt'), 'utf-8');
})
.then(data => {
    console.log('data3.txt 中的内容：');
    console.log(data);
    console.log('');
    console.log('');
})
.catch (err => {
    throw err;
});
