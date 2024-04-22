const express = require('express');
const path = require('path');
// 导入自定义中间件
const accessLog = require('./middleware/accesslog');
const catchError = require('./middleware/catcherror');
// 导入数据
const data = require('./data/top.json'); // data是一个对象

// 创建服务
const app = express();

// 模板引擎设置
//1. 设置 express 所使用的模板引擎 会根据这里的设置自动引入模板引擎，必须再写 require()
app.set('view engine', 'ejs');
//2. 设置模板文件的存放目录
app.set('views', path.resolve(__dirname, 'views'));

//1. 更改模板引擎名字为 html
// app.engine('html', ejs.renderFile);
// //2. 设置 express 所使用的模板引擎 
// app.set('view engine', 'html');
// //3. 设置模板文件的存放目录
// app.set('views', path.resolve(__dirname, 'views'));


// 挂载访问日志中间件
app.use(accessLog);


// 路由
app.get('/', (req, res) => {
    // 加载模板文件 放入数据 响应给客户端
    // res.render('index', {title:'富豪榜'});
    res.render('index', data);
});


// 挂载错误处理中间件
app.use(catchError);

// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});
