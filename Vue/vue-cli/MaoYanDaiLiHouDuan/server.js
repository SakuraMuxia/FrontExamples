
const express = require("express");
const axios = require("axios");
const app = express();
// 设置响应 放开跨域限制
app.use((req,res,next)=>{
	res.set("Access-Control-Allow-Origin","*");
    // 允许请求方法 所有 (默认不支持put delete)
	res.set("Access-Control-Allow-Methods","*");
    // 允许携带请求头
	res.set("Access-Control-Allow-Headers","*");
    // 放行
	next();
})
// // 设置路由 并且响应数据
app.get("/info",(req,res)=>{
	console.log(req.headers.host);
	res.json({
		ok:1,
		msg:"get->info"
	})
})
// 设置路由 重新向服务端请求数据 然后把数据响应给客户端
app.get("/maoyan",(req,res)=>{
	axios.get("https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=上海&ci=10&channelId=4")
    .then(value => {
		res.json(value.data);
	})
})
// 启动服务
app.listen(8066,()=>{
	console.log("success");
})