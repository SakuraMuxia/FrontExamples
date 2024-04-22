const moment = require('moment');
const fs = require('fs');
const path = require('path');


// 暴露数据
module.exports = (req,res,next) => {
    // 从请求报文中获取信息
    const ip = req.ip.slice(7);
    const method = req.method;
    const url = req.url;
    const dt = moment().format('YYYY-MM-DD HH:mm:ss');

    // 拼接日志内容
    const logMsg = `${ip} ${dt} ${method} ${url}\n`;
    console.log(logMsg);

    // 异步方式写入
    fs.appendFile(path.resolve(__dirname, '../logs/access.log'), logMsg, err => {
        if (err) {
            throw err;
        }
        // 成功写入日志 放行
        next();
    });
}