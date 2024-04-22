// 导入模块
const express = require('express');
// 导入数据模块
const newsData = require('./data.json');

console.log(newsData);

// 拼接html li标签结构
const res = newsData.map(item => '<li><a href="#">' + item.newsTitle + '</a></li>').join('');
console.log(res);

// 创建服务
const app = express();

// 匹配路由
app.get('/',(req,res)=>{
    res.redirect('/news');
});

// 新闻页
app.get('/news',(req,res)=>{
    // 定义响应内容
    const resBody = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>新闻列表</title>
    </head>
    <body>
        <h1>新闻列表</h1>
        <hr>
        <ul>
            ${newsData.map(item => '<li><a href="/news/'+item.id+'.html">'+item.newsTitle+'</a></li>').join('')}
            ${newsData.map(item => '<li><a href="/news/details?id='+item.id+'">'+item.newsTitle+'</a></li>').join('')}
        </ul>
    </body>
    </html>
    `;
    // 响应
    res.send(resBody);
});
// 新闻详情页
// app.get('/news/details', (req, res) => {
app.get('/news/:id.html', (req, res) => {
    // 从查询字符串中获取id信息
    // const id = req.query.id;
    // 从查询url中获取id信息
    const id = req.params.id;
    // 根据id从数组中获取对应的新闻
    // 使用数组es6 find方法 得到第一个满足条件的元素
    const newsItem = newsData.find(item => item.id === id);
    console.log(newsItem);
    if(!newsItem){
        res.status(404).send('<h1>您的新闻走丢了~~~~</h1>');
        return;
    }

    // 定义响应内容
    const resBody = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>新闻列表</title>
    </head>
    <body>
        <h1>${newsItem.newsTitle}</h1>
        <hr>
        <p>${newsItem.newsContent}</p>
    </body>
    </html>
    `;

    // 响应
    res.send(resBody);
});

// 启动服务
app.listen(8080, () => {
    console.log('http server is runing on :8080');
});