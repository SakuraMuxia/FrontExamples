const express = require('express');
// 导入自定义中间件
const accessLog = require('./middleware/accesslog');
const catchError = require('./middleware/catcherror');
// 创建服务
const app = express();

// 挂载访问日志中间件
app.use(accessLog);

// 将中间件挂载到应用上
app.use((req, res, next) => {
    console.log('Hello， 我是中间件 Tom， How Are You?');
    // 结束响应
    //res.send('到这就结束了！');
    
    // 执行下一个中间件
    next();
});

// 定义中间件挂载到应用的指定路径上
app.use('/login', (req, res, next) => {
    post(); //执行不存在的函数会报错
    console.log('刷我的卡，我是中间件，我叫泰裤辣！');
    next();
});

// 总路由
app.get('/', (req, res) => {
    res.redirect('/index');
});

// 首页路由
app.get('/index', (req, res,next) => {
    console.log('我也是中间件，路由回调就是中间件，我叫小乐子');
    next();
});
// 首页路由
app.get('/index', (req, res) => {
    res.send(`
    <h1>首页</h1>
    <hr>
    <a href="/login">登录</a>
    `)
});

// 路由
app.get('/login', (req, res) => {
    res.send(`
    <h1>登录</h1>
    <hr>
    <form action="/login" method="post">
        <input placeholder="请输入用户名" type="text" name="username">
        <input placeholder="请输入密码" type="password" name="userpwd">
        <button>提交</button>
    </form>
    `);
});

// 路由
app.post('/login', (req, res) => {
    res.send('<h2>提交成功！</h2>');
});

// 挂载错误处理中间件
app.use(catchError);

// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});
