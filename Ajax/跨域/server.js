// 导入模块
const path = require('path');
const express = require('express');

// 创建 express 实例
const app = express();

// 1. 同源策略 -----------------------------------------------------------------------
// 同源策略
app.get('/page01', (req, res) => {
    res.sendFile(path.join(__dirname, '01-CORS.html'));
});
// 接收 ajax 请求
app.get('/getdata01', (req, res) => {
    // 设置响应头 允许跨域;  可以允许的前端页面的域名
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.198:8080');
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
        {name:'安妮0', age:90, address:'上海'},
        {name:'安妮1', age:90, address:'上海'},
        {name:'安妮2', age:90, address:'上海'},
        {name:'安妮3', age:90, address:'上海'},
        {name:'安妮4', age:90, address:'上海'}
    ];

    // 从 url 中得到函数名
    let method = req.query.cb;
    // 定义响应体 js 代码
    let body = `${method}(${JSON.stringify(users)})`;

    res.send(body)
    // res.send(`getInfo(${JSON.stringify(users)})`);
});



// 开启服务
app.listen(8080, () => {
    console.log('HTTP服务启动成功，端口号 8080');
})