// 导入模块
const qs = require('querystring');

// 定义查询字符串
const searchData = 'name=hanser&age=18&address=南京';

// 将查询字符串解析为对象
console.log(qs.parse(searchData));  //Object对象格式

// 将对象转为查询字符串形式
const user = {
    username:'Kano',
    email:'123456@qq.com',

}
console.log(qs.stringify(user));