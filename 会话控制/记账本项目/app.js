var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 挂载session中间件，并且初始化
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

// 挂载路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
