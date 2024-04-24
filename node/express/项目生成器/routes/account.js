var express = require('express');
const path = require('path');
var router = express.Router();
// lowdb相关 记得首先初始化数据库
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.resolve(__dirname, '../dbs', 'db.json'));
const db = low(adapter);
// 生成唯一id的模块
const shortid = require('shortid');

// 账单列表
router.get('/',(req,res) => {
    // // 从lowdb中取出数据
    const data = db.get('accounts').value(); // 返回的是一个数组，因为json中 account的值就是一个数组
    console.log(data);
    // // 渲染模版，发送数据 {data:data} 属性名是data，值也是data 简写为data
    res.render('account/index',{data:data});
    // res.render('account/index');

});

// 添加账单表单
router.get('/create',(req,res)=>{
    res.render('account/create');
});

// 执行添加
router.post('/create', (req, res) => {
    // express-generator自带body-prase中间件把req.body中的数据转为对象
    // console.log(req.body);
    // 创建一个唯一id 使用shortid包中的方法
    const id = shortid.generate();
    // 向lowdb 添加数据
    db.get('accounts').unshift({id:id, ...req.body}).write();
    // 渲染成功页面
    res.render('account/success', {title:'账单添加成功~~~', url:'/account'});

});

// 执行删除
router.get('/delete/:id', (req, res) => {
    // 获取id
    const id = req.params.id;
    // 从 lowdb 中删除指定数据
    db.get('accounts').remove({id:id}).write();
    // 渲染成功的模板
    res.render('account/success', {title:'账单删除成功~~~', url:'/account'});
});
module.exports = router;