// 导入模块
const express = require('express');
const path = require('path');

// 创建服务
const app = express();

// 匹配路由 get
app.get('/', (req, res,next) => {
    res.send('<h1>欢迎访问本网站！</h1>');
});

// // 实现静态资源文件托管服务 中间件
app.use(express.static(path.resolve(__dirname,'public')));

// get方式 /login
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './pages/login.html'));
    
});

// post方式  /login
app.post('/login', (req, res) => {
    res.send('<h2>表单提交成功！</h2>');
});

// 启动服务
app.listen(8080, () => {
    console.log('http server is runing on :8080');
});