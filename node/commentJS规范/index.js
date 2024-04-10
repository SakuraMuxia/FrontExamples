/*
    模块中暴露数据：
    ① 模块默认暴露的数据是个空对象
    ② 在模块中 给 module.exports 赋值， 它的值就是暴露的数据
    ③ 在模块中 给 module.exports 添加属性，实现暴露多个数据
    ④ 在模块中 给 exports （exports 是 module.exports 的别名）添加属性，实现暴露多个数据； 不能给 exports 重新赋值
    总结：
    module 是模块中的内置对象，具有属性 exports， module.exports 的初始值是个空对象， module.exports 的值就是该模块要暴露的数据
    变量 exports 和 module.exports 指向同一个对象
*/
// 导入模块,并使用模块中的数据
const mod01 = require('./modules/hanser/01-mod.js');
console.log(mod01);

// 如果模块暴露的数据是个对象 导入模块的时候可以使用解构赋值
const{name,age,say} = require('./modules/hanser/01-mod.js');
console.log(name);

// 模块中可以 给 module.exports 添加属性，可以暴露多个数据
const mod02 = require('./modules/hanser/02-mod.js');
mod02.getMessage();

// 模块中可以 给 exports 添加属性，可以暴露多个数据; 但是不能给 exports 重新赋值
const mod03 = require('./modules/hanser/03-mod.js');
console.log(mod03.username);

// 导入 json 得到根据json数据解析出来的对象
const mod04 = require('./modules/hanser/04-json.json');
console.log(mod04);

// 导入一个扩展名不是 .js、.json、.node 的模块文件
const mod05 = require('./modules/hanser/05-hanser.hanser');
console.log(mod05);

// 整个目录作为模块  在目录中的 pageage.son 中设置入口文件
const mod06 = require('./modules/hanser/modules/');
mod06.getMoney();