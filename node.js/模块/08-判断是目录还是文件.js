const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname,'./data/');
fs.stat(filename,(err,stats) => {
    if(err){
        console.log('错误',err.message);
    }else{
        console.log('是否是目录',stats.isDirectory());
        console.log('是否是文件',stats.isFile());
    }
});

console.log('---------------');
try {
    const stats1 = fs.statSync(filename);
    console.log(stats1);
    console.log('是否是目录',stats1.isDirectory());
    console.log('是否是文件',stats1.isFile());
} catch (error) {
    console.log('错误',err.message);
}

