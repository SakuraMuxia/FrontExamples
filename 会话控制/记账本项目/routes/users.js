var express = require('express');
var router = express.Router();
const md5 = require('md5');
// 导入users集合对应的模型
const usersModel = require('../models/users');
// 导入jwt
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  res.redirect('users/login');
});
/* 注册页  GET: /users/reg */
router.get('/reg', function(req, res) {
  res.render('users/reg');
});

// 执行注册
router.post('/reg', function(req, res) {
  // 验证提交数据
  usersModel.create({username:req.body.username,userpwd:md5(req.body.userpwd)},err =>{
    if (err) {
      res.render('account/fail', {title:'注册失败，请稍后再试~~', url:'/users/reg'});
    } else {
      res.render('account/success', {title: '注册成功，请登录~~', url:'/users/login'});
    }
  })
});
// 登陆页面
router.get('/login', function(req, res) {
  res.render('users/login');
});
// 执行登陆
router.post('/login', function(req, res) {
  // 获取表单数据 解析赋值 req.body 经过中间件 generator处理 可以直接得到对象形式
  const {username, userpwd} = req.body;
  // 根据 username 和 userpwd 从数据库查询数据
  usersModel.findOne({username,userpwd:md5(userpwd)},(err,data)=>{
    if(err){
      return res.status(500).send('数据库错误');
    }
    // 判断是否查询到用户
    if(data){
      // 将用户名和用户id存储在session,通过设置属性名添加属性信息
      console.log(data); //返回一个对象 ，数据库查找后输出的结果
      req.session.username = data.username;
      req.session.userid = data._id;
      // 设置token
      let token = jwt.sign({
          username: 'data.username',
          userid:'data._id'
      }, 'atguigu', {
          expiresIn: 60 //单位是 秒
      });

      console.log(token);

      // 渲染模板
      res.render('account/success', {title: '登录成功~~', url:'/account'});
    }else {
      res.render('account/fail', {title:'用户名或密码错误，请重新登录~~', url:'/users/login'});
    }
  });

});
// 退出登陆
router.get('/logout', (req, res) => {
  // 删除session
  req.session.destroy(()=>{
    res.render('account/success', {title: '退出登录~~', url:'/users/login'})
  });
});

module.exports = router;
