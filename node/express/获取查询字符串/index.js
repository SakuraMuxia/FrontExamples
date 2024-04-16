// 导入模块
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

// 创建服务
const app = express();

// 使用中间件 bodyParser 处理request请求体内容
app.use(bodyParser.urlencoded({ extended: false }))

// ip地址 url 请求头
app.get('/index', (req, res) => {
    // console.log(req);
    // console.log(req.ip);
    // console.log(req.get('user-agent'));
    res.send(`
    <h1>Index</h1>
    <hr>
    <p>您的IP：${req.ip}</p>
    <p>您的URL：${req.url}</p>
    <p>您的浏览器信息：${req.get('user-agent')}</p>
    `);
});


// 响应一个页面
app.get('/search', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'search.html'));
});
// 获取查询字符串
app.get('/submit', (req, res) => {
    console.log(req.query);
    res.send(`
    <h1>获取到的查询字符串信息</h1>
    <hr>
    <p>wd：${req.query.wd}</p>
    <p>type：${req.query.type}</p>
    <p>origin：${req.query.origin}</p>
    `);
});


// 获取URL中的路径参数
app.get('/news/:cate/:id.html', (req, res) => {
    console.log(req.params);

    res.send(`
    <h1>获取到的路径参数信息</h1>
    <hr>
    <p>cate：${req.params.cate}</p>
    <p>id：${req.params.id}</p>
    `);
});


app.route('/form')
    // 响应页面
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname, 'pages', 'form.html'));
    })
    // 获取请求体数据
    .post((req, res) => {
        console.log('请求体数据',req.body);
        const content = `
        姓名： ${req.body.name}
        邮箱： ${req.body.email}
        电话： ${req.body.phone}
        生日： ${req.body.birthday}
        留言：
        ${req.body.message};
        `;
        // 定义文件名 将请求体信息存储到文件中
        const filename = path.resolve(__dirname, './dbs', req.ip.slice(7) + '.txt')
        // 写入文件
        fs.writeFile(filename, content, err => {
            if (err) {
                res.send('提交失败！');

            } else {
                 res.send('提交成功！');
            }
        });
    });

// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});