// 导入模块
const path = require('path');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');

// 配置 https 证书
const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'keys', 'private.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'keys','cert.crt'))
};


// 创建 express 实例
const app = express();
// cookie 处理中间件
app.use(cookieParser());

// 1. 同源策略 -----------------------------------------------------------------------
// 同源策略
app.get('/page01', (req, res) => {
    res.sendFile(path.join(__dirname, '01-CORS.html'));
});
// 接收 ajax 请求
app.get('/getdata01', (req, res) => {
    // 允许单个域名跨域请求
    // res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.set('Access-Control-Allow-Origin', 'http://192.168.2.231:8080');
    
    // 允许多个域名跨域请求
    // const allowOrigins = ['https://localhost:8081', 'https://192.168.2.231:8081', 'https://127.0.0.1:8081'];
    // if (allowOrigins.includes(req.get('Origin'))) {
    //     res.set('Access-Control-Allow-Origin', req.get('Origin'));
    // }


    // 允许所有的域名
    // res.set('Access-Control-Allow-Origin', '*');

    res.send('hello ajax');
});

// 2. jsonp -----------------------------------------------------------------------
// 打开 02-jsonp解决跨域.html 静态文件
app.get('/page02', (req, res) => {
    res.sendFile(path.join(__dirname, '02-jsonp.html'));
});

// 接收到是 jsonp 的请求
app.get('/getdata02', (req, res) => {
    // // 定义数据
    const users = [
        {name:'小乐0号', age:90, address:'上海松江'},
        {name:'小乐1号', age:90, address:'上海浦东'},
        {name:'小乐2号', age:90, address:'上海金山'},
        {name:'小乐3号', age:90, address:'上海黄浦'},
        {name:'小乐4号', age:90, address:'上海闵行'}
    ];

    // 从 url 中得到函数名
    let method = req.query.cb;

    // 定义响应体 js 代码
    let body = `${method}(${JSON.stringify(users)})`;

    res.send(body)


    // res.send(`getInfo(${JSON.stringify(users)})`);
});



// 开启服务
// app.listen(8080, () => {
//     console.log('HTTP服务启动成功，端口号 8080');
// });

https.createServer(options, app).listen(8081, () => {
    console.log('HTTPS server is running on port 8081');
});
