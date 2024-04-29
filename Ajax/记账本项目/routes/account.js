var express = require('express');
const path = require('path');
var router = express.Router();

// 导入 accounts 结合对应的模型
const accountsModel = require('../models/accounts');
// 导入验证是否登录的中间件
const checkLogin = require('../middlewares/checklogin');

// 账单列表
router.get('/',checkLogin,(req,res) => {
    // 渲染ejs模板 发送数据
    res.render('account/index', {username:req.session.username, userid:req.session.userid});
});
module.exports = router;