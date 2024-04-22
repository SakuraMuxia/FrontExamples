const express = require('express');
// 导入自定义中间件
const accessLog = require('./middleware/accesslog');
const catchError = require('./middleware/catcherror');

// 导入路由模块
const indexRouter = require('./route/index');
const loginRouter = require('./route/login');

// 创建服务
const app = express();

// 挂载访问日志中间件
app.use(accessLog);

// 挂载路由模块
app.use(indexRouter);  //挂载路由 
app.use('/login', loginRouter);  // 挂载路由 指定路径



// 挂载错误处理中间件
app.use(catchError);

// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});
