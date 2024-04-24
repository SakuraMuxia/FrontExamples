var express = require('express');
const path = require('path');
var router = express.Router();
// 导入 accounts 结合对应的模型
const accountsModel = require('../models/accounts');

// 账单列表
router.get('/',(req,res) => {
    // 从数据库中读取账单信息
    accountsModel.find((err, data) => {
        if (err) {
            res.status(500).send('数据库读取失败！');
        } else {
            // 渲染模板 发送数据
            res.render('account/index', {data});
        }
    })
});

// 添加账单表单
router.get('/create',(req,res)=>{
    res.render('account/create');
});

// 执行添加
router.post('/create', (req, res) => {
   // 向数据写入数据 req.body 是一个对象
    accountsModel.create(req.body, err => {
        if (err) {
            // 渲染失败的页面
            res.render('account/fail', {title:'账单添加失败~~~', url:'/account'});
        } else {
            // 渲染成功页面
            res.render('account/success', {title:'账单添加成功~~~', url:'/account'});
            console.log(req.body);
        }
    })

});

// 执行删除
router.get('/delete/:id', (req, res) => {
    // 获取id
    const id = req.params.id;
    // 从数据库中删除指定的数据
    accountsModel.deleteOne({_id:id}, err => {
        if (err) {
            // 渲染失败的页面
            res.render('account/fail', {title:'账单删除失败~~~', url:'/account'});
        } else {
            // 渲染成功的模板
            res.render('account/success', {title:'账单删除成功~~~', url:'/account'});
        }
    });
});
module.exports = router;