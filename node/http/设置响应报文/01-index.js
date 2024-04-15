
const http = require('http');

// 创建服务
const server = http.createServer((req, res) => {
    // 设置响应状态码
    // res.statusCode = 250;
    res.statusCode = 201;
    // res.statusCode = 404;

    // 设置响应状态描述
    // res.statusMessage = 'sb';
    res.statusMessage = 'Happy';
    // res.statusMessage = 'Not Found';


    // 设置响应头
    res.setHeader('Content-type', 'text/html;charset=utf-8');
    res.setHeader('Server', 'le server 1.0.1');


    // 同时设置响应状态码 响应状态描述 响应头
    res.writeHead(200, 'OK', {
        'Server': 'nginx 2.1.1',
        'Token': 'sdfaslkdjalkdsjflkdsfadsf'
    });

    // 向响应体写入内容
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);
    res.write(`<p>${Math.random()}</p>`);

    // 结束响应
    // res.end();

    // 向响应体写入内容并结束响应
    res.end('<hr><h2>结束<h2>');
});

// 启动服务
server.listen(8080, () => {
    console.log('http server is runing on 8080');
})