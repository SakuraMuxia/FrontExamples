// 导入模块
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

// 创建服务
const app = express();

// 设置处理session的中间件 并进行session的初始设置
app.use(session({
    name: 'sess',      // 设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', // 参与加密的字符串（又称签名） 加盐
    saveUninitialized: false, //是否为每次请求都设置一个 cookie 用来存储 session 的 id
    resave: true , //  是否在每次请求时重新保存 session
    cookie: {
    	httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 1000*3600 // 这一条 是控制 sessionID 的过期时间的！！！
    },
    // 创建一个存储文件的对象,store: new FileStore()为空时默认 存储在当前目录的session文件夹中。
    store: new MongoDBStore({
        uri:'mongodb://root:sakura@192.168.1.38:27017/hanser?authSource=admin',
        collection:'session'
    })
}));

// 路由
app.get('/set', (req, res) => {
    // 设置 session 添加属性就是 设置session
    req.session.userName = 'gaoxiaole';
    req.session.userpwd = '12212112';
    req.session.userid = '1231';
    req.session.parents = [10,20,30,40,50,60];
    res.send('session 设置成功~~');
});
// 路由
app.get('/get', (req, res) => {
   console.log(req.session); // 返回一个session的对象
   res.send(`
   session读取成功~~<br>
   用户名： ${req.session.userName}<br>
   用户ID： ${req.session.userid}<br>
   `);
});
// 路由
app.get('/delete', (req, res) => {
    // 删除单个session
    // delete req.session.userid;
  
    // 删除所有的session
    req.session.destroy(() => {
        res.send('session 全部删除');
    });

})
// 启动服务
app.listen(8080, () => {
    console.log('http server is running on :8080');
});