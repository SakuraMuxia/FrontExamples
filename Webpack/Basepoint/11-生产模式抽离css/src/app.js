// 导入模块
import one from './js/one';   // 扩展名可以省略
import two from './js/two';   // 扩展名可以省略
import three from './js/three';   // 扩展名可以省略

// 导入json
import users from './json/data';  //  扩展名可以省略
// 导入css
import './css/style.css';
// 导入 less
import './less/app.less';
// 导入polyfill 提高兼容性
// import '@babel/polyfill';

one();
two();
three();
console.log(users);

console.log(12_675);
