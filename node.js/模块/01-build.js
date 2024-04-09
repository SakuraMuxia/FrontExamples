const path = require('path');
// 判断是否是绝对路径
const absolute = path.isAbsolute(__filename);
console.log(absolute);
// 路径拼接
const join = path.join(__dirname,'data','./images/banner.png');
console.log(join);
// 文件目录
const dirname = path.dirname(__filename);
console.log(dirname);
// 文件名
const basename = path.basename(__filename);
console.log(basename);
// 后缀名
const extname = path.extname(__filename);
console.log(extname);
// 拼接并序列化为绝对路径
const resolve = path.resolve('./images','data',);
console.log(resolve);