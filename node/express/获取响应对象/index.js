// 导入模块
const express = require('express');
const path = require('path');

// 创建服务
const app = express();

app.get('/index', (req, res) => {
    // 设置响应头
    res.status(200)
       .set('Server', 'nginx 1.0.1')
       .set('token', Math.random())
       .send(`
       <h1>Index</h1>
       <hr>
       <a href="/data">data</a>
       <a href="/files">files</a>
       `);
});


app.get('/', (req, res) => {
    // 重定向
    res.redirect('/index');
});

app.get('/data', (req, res) => {
    res.json({name:'小乐', age:1212});
});

app.get('/files', (req, res) => {
    res.download(path.resolve(__dirname, './pages/form.html'));
})


// 放在最后 匹配不到就执行这里 
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 页面不存在！</h1>');
})
   


// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});