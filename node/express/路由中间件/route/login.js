// 导入模块
const express = require('express');

// 创建路由对象
const route = express.Router();


// 路由
route.get('/', (req, res) => {
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
route.post('/', (req, res) => {
    res.send('<h2>提交成功！</h2>');
});

// 将路由对象作为暴露数据
module.exports = route;