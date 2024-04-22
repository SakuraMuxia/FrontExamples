const moment = require('moment');
const fs = require('fs');
const path = require('path');


// 暴漏数据
module.exports = (err, req, res, next) => {
    // 从请求报文中获取信息
    const ip = req.ip.slice(7);
    const method = req.method;
    const url = req.url;
    const dt = moment().format('YYYY-MM-DD HH:mm:ss');

    // 拼接日志内容
    // err.stack 记录详细的错误信息
    const errMsg = `${ip} ${dt} ${method} ${url} \n ${err.stack} \n\n\n\n`;
    console.log(errMsg);
    // 异步方式写入
    fs.appendFile(path.resolve(__dirname, '../logs/error.log'), errMsg, err => {
        if (err) {
            throw err;
        }
    });
    // 响应 500
    res.status(500).send('<h1>500 服务器出错！</h1>');
}