// 导入模块
const express = require('express');

// 创建路由对象
const route = express.Router();

// 路由
route.get('/', (req, res) => {
    res.redirect('/index');
});

// 路由
route.get('/index', (req, res,next) => {
    res.send(`
    <h1>首页</h1>
    <hr>
    <a href="/login">登录</a>
    `);
});

// 将路由对象作为暴露数据
module.exports = route;