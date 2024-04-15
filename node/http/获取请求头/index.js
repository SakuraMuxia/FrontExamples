// 导入模块
const http = require('http');
// const table = require('table');
// 使用结构赋值
const {table} = require('table');

// 创建服务
const server = http.createServer((req,res)=>{
    // 规避favicon
    if(req.url == '/favicon.ico'){
        return res.end;
    }
    // 获取请求行信息
    console.log('请求方式:',req.method);
    console.log('url:',req.url);
    console.log('请求版本:',req.httpVersion);
    // console.log('请求头信息',req.headers);
    // 获取IP地址
    console.log('客户端IP:', req.socket.remoteAddress.slice(7));
    // 获取客户端浏览器信息
    console.log('客户端浏览器信息：', req.headers['user-agent']);
    console.log(table(Object.entries(req.headers)));
    // 设置相应头
    res.setHeader('Content-type','text/html;charset=utf-8');
    // 做出响应
    res.end('<h2>恭喜您！表单提交成功！</h2>');
});

// 启动服务
server.listen(8080,'',()=>{
    console.log('Success');
});