// 导入模块
const express = require('express');
const cookieParser = require('cookie-parser');
// 创建服务
const app = express();
// 给应用设置处理cookie的中间件
app.use(cookieParser());
// 路由
app.get('/set', (req, res) => {
    // 设置 cookie
    res.cookie('username', 'admin');
    res.cookie('userid', '932232323');
    res.cookie('address', '上海', {maxAge: 3600*1000});
    res.cookie('parerts', [10,20,30,40,50]);
    // 设置 响应
    res.send('cookie 设置成功~~');
});
// 路由
app.get('/get', (req, res) => {
    console.log(req.cookies);  // 返回一个对象
     res.send(`
    cookie 查看成功~~<br>
    用户名： ${req.cookies.username}<br>
    地址： ${req.cookies.address}
    `);
})

// 路由
app.get('/delete', (req, res) => {
    res.clearCookie('username');
    res.send('cookie删除成功！');
})

// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});