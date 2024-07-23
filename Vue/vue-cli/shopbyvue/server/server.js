const express = require('express');
const path = require('path');
const likeData = require('./data/likeList.json');
// 创建应用
const app = express();
// 使用内置中间件，托管静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 请求方式：get
// 请求地址：http://zhangpeiyue.com:8082/likeList
// 请求参数：query
//     pageSize：每页显示的条数
//     pageNo:页码
// 响应结果：
// {
//      ok:1,
//      msg:"success",
//      likeList:[],// 喜欢列表
//      pageSum:1// 总页数
// }

// 匹配get
app.get("/likeList",(req,res)=>{
    // 从请求查询字符串中解构出 pageNo pageSize,设置默认值
    let { pageNo=1, pageSize} = req.query
    pageNo = pageNo/1;
    pageSize = pageSize/1;
    // 设置响应体
    res.json({
        ok:200,
        msg:"success",
        data:likeData.slice((pageNo-1)*pageSize,pageSize*pageNo),
        pageSum:Math.ceil(likeData.length/pageSize)
    })
    
})
// 监听应用
app.listen(7070,()=>{
    console.log("Server is running on 7070 !!!");
})
