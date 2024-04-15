// 导入模块
const http = require('http');
const url = require('url');

// 创建服务
const server = http.createServer((req,res)=>{
    // 规避favicon
    if(req.url == '/favicon.ico'){
        return res.end;
    }
    // 解析url,获取查询字符串 （方式1）
    const urlInfo = url.parse(req.url,true);
    const urlString = urlInfo.query.a;
    console.log(urlString);
    
    // 解析url,获取查询字符串 （方式2）
    const urlInfo1 = new URL('http://127.0.0.1' + req.url);
    // 使用得到的对象中的searchParams属性，searchParams属性本身是一种类似MAP结构的对象
    const urlString1 = urlInfo1.searchParams.get('a');
    console.log(urlString1);

    res.setHeader('Content-type','text/html;charset=utf-8');
    // 做出响应
    res.end('Hanser酱');
});

// 启动服务
server.listen(8080,'',()=>{
    console.log('HTTP Server running Success!!!');
});