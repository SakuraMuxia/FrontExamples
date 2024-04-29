module.exports = (req, res, next) => {
    // 判断是否登录
    if (req.session.userid) {
        // 执行后续操作
        next();
    } else {
        // 重定向到登录页
        res.redirect('/users/login');
    }
}