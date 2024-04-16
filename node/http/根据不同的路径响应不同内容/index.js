// 导入模块
const http = require('http');
const url = require('url');
// 创建服务
const server = http.createServer((req,res)=>{
    // 获取到URL中的路径部分
    const pathname = url.parse(req.url).pathname;
    
    // 根据路径名不同做出不同的响应
    switch(pathname){
        case '/':
        case '/index':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>首页</h1><hr><a href="/login">登录</a> <a href="/register">注册</a>');
            break;
        case '/login':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>登录</h1>');  
            break;
        case '/register':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>注册</h1>');  
            break;
        default:
            res.writeHead(404, 'Not Found', {
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>404 您访问的页面不存在的！</h1><a href="/">返回首页</a>');
    }



});
// 启动服务
server.listen(8080,()=>{
    console.log('http server is running on 8080');
});