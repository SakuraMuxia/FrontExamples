// 导入模块
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mimes = require('./mimes/mimes.json');

// 创建服务
const server = http.createServer((req,res)=>{
    // 从url中获取路径名
    const pathname = url.parse(req.url).pathname;
    
    // 获取到文件的扩展名
    const extname = pathname.slice(pathname.lastIndexOf('.')+1);
    // 根据 pathnaem 定义要请求的静态资源文件的路径
    let filename = path.join(__dirname, 'public', pathname);
    console.log(filename);
    // 可能存在中文路径，浏览器会自动编码，需要进行解码
    filename = decodeURI(filename);

    // 判断要请求的静态资源文件是否存在
    fs.access(filename, err => {
        if (err) {
            res.writeHead(404,'Not Found', {
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>404 您访问的页面不存在！</h1>');
        } else {
            // 读取文件的内容 响应给客户端浏览器
            fs.readFile(filename, (err,data) => {
                if (err) {
                    res.writeHead(500,'Internal Server Error', {
                        'Content-type': 'text/html;charset=utf-8'
                    });
                    res.end('<h1>500 服务器发生未知错误！ </h1>');
                } else {
                    // 使用mimes文件设置响应的类型，如果mimes文件中不存在则使用空
                    res.setHeader('Content-type', mimes[extname] || '')
                    res.end(data);
                }
            })
        }
    });
});

// 启动服务
server.listen(8080, () => {
    console.log('http server is running on 8080');
});