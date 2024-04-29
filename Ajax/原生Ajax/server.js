// 导入模块
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// 用于上传的模块
const multer = require('multer');



// 创建 express 实例
const app = express();


// 挂载中间件处理请求体
app.use(bodyParser.text());
app.use(bodyParser.json());
// 处理application/x-www-form-urlencoded的中间件
app.use(bodyParser.urlencoded({extended: false}));



// 1. 基本流程 ------------------------------------------------------------------------
// 打开 01-ajax基本流程.html 页面
app.get('/page01', (req, res) => {
   res.sendFile(path.join(__dirname, '01-ajax基本流程.html'));
});
app.get('/getData', (req, res) => {
    console.log('接收到请求');
    res.send('hello ajax ' + Math.random());
});


// 2. 发送请求携带数据 ------------------------------------------------------------------------
app.get('/page02', (req, res) => {
    res.sendFile(path.join(__dirname, '02-发送请求携带数据.html'));
});
// 接收 get 请求
app.get('/addData', (req, res) => {
    console.log('接收到 GET 请求：')
    // 获取请求URL
    console.log('url：', req.url);
    // 查询字符串
    console.log('从url中提取数据:', req.query);
    console.log('');
    res.send('GET 方式提交成功！');
});
// 接收 post /addData
app.post('/addData', (req, res) => {
    console.log('接收到 POST 请求：')
    console.log('URL中获取的信息：', req.query);
    console.log('请求体内容类型：', req.headers['content-type']);
    console.log('请求体中获取的信息：', req.body, typeof req.body);
    console.log('');
    res.send('POST 方式提交成功！');
});
// 接收 put /addData
app.put('/addData', (req, res) => {
    console.log('接收到 PUT 请求：')
    console.log('URL中获取的信息：', req.query);
    console.log('请求体内容类型：', req.headers['content-type']);
    console.log('请求体中获取的信息：', req.body, typeof req.body);
    console.log('');
    res.send('PUT 方式提交成功！');
});
 

// 3. 上传文件 ------------------------------------------------------------------------
app.get('/page03', (req, res) => {
    res.sendFile(path.join(__dirname, '03-FormData.html'));
});
const upload = multer({ dest: 'uploads/' })
app.post('/upload', upload.single('avator'),(req, res) => {
    console.log('文件上传成功：');
    console.log('文件信息：', req.file);
    console.log('表单数据：', req.body);
    console.log('');
    res.send('文件上传成功！');
})


// 4. 读取响应报文 ------------------------------------------------------------------------
app.get('/page04', (req, res) => {
    res.sendFile(path.join(__dirname, '04-解析响应报文.html'));
});


// 5. 响应 json 数据 ------------------------------------------------------------------------
// 响应04-请求json数据.html
app.get('/page05', (req, res) => {
   res.sendFile(path.join(__dirname, '05-响应json数据.html'));
});
// 接收 ajax请求，响应 json 数据
app.get('/getUsers', (req, res) => {
    const users = [
        {name:'安妮0', age:90, address:'上海'},
        {name:'安妮1', age:92, address:'上海'},
        {name:'安妮2', age:94, address:'乌鲁木齐'},
        {name:'安妮3', age:96, address:'上海'},
        {name:'安妮4', age:88, address:'上海'}
    ];
    // 对象转为json字符串
    const usersStr = JSON.stringify(users);

    // 设置响应头 告知浏览器响应体的内容类型
    res.setHeader('Content-type', 'application/json;charset=utf-8');
    res.send(usersStr);
});


// 6. 响应超时------------------------------------------------------------------------
// 请求超时
app.get('/page06', (req, res) => {
    res.sendFile(path.join(__dirname, '06-响应超时.html'));
});
// 接收 ajax 请求的
app.get('/getInfo', (req, res) => {
    // 后端设置响应超时时间为一个随机数 0-9
    const timeout = Math.floor(Math.random() * 10) * 1000;

    setTimeout(function(){
        res.send('getInfo 响应成功！');
    }, timeout);
});


// 7. 进度事件 ------------------------------------------------------------------------
app.get('/page07', (req, res) => {
    res.sendFile(path.join(__dirname, '07-进度事件.html'));
});
// 接收 ajax 请求
app.get('/getMoreData', (req, res) => {
    res.send('你好，Ajax\n'.repeat(1000000));
});


// 8. 同步请求和异步请求 ------------------------------------------------------------------------
app.get('/page08', (req, res) => {
    res.sendFile(path.join(__dirname, '08-同步和异步.html'));
});

// 开启服务
app.listen(8080, () => {
    console.log('HTTP服务启动成功，端口号 8080');
})
