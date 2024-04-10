// 使用ES6模块的语法 导入内部模块
import * as fs from 'node:fs';

fs.writeFile('data.txt', 'hello world', err=>{});

// 1 导入模块   模块中使用 export default 关键字暴露了一个数据
import mod01 from './modules/01-mod.js';
console.log(mod01.address);

// 2 导入模块 模块中使用 export 关键字暴露多个数据
import {user,data,getMessage} from './modules/02-mod.js';
console.log(user);

// 将模块中暴露的所有数据导出到一个对象
import * as mod02 from './modules/02-mod.js';
console.log(mod02);

// 3. 导入模块 块中使用 export 关键字暴露多个数据，是合并到一块暴露的
import {num01,num02} from './modules/03-mod.js';
console.log(num01);

// 4. 导入模块 整个目录作为模块
import mod04 from './modules/modules/04-mod.js';
console.log(mod04);