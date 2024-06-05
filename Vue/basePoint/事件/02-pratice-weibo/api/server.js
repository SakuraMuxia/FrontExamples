const path = require("path");
const express = require("express");
const contentListM = require("./db/model/contentList");
const moment = require("moment");
const {raw} = require("express");
const app = express();
app.use((req,res,next)=>{
	res.set("Access-Control-Allow-Origin","*");
	res.set("Access-Control-Allow-Headers","*");
	res.set("Access-Control-Allow-Methods","*");
	next();
})
app.use(express.json());
// 操作数据库的共同点：1- 必须要连接数据库  2- 必须要生成Schema 3-必须要有model
// 项目可能要有多个集合，每个集合中的Schema,model是不同的，但连接数据库的方法是相同的。
// 每一个model即是一个文件，连接数据库是一个文件
app.post("/weibo",async (req,res)=>{
	// 思路：
	// 1- 接收数据
	// 2- 验证内容是否重复
	// 3- 添加数据
	// 4- 响应结果
	const {content} = req.body;
	try{
		// 获取与微博内容相同的文档条数
		const count = await contentListM.count({content});
		// 如果没有重复
		if(count===0){
			await contentListM.insertOne({
				content,
				addTime:Date.now()// moment().format("YYYY-MM-DD HH:mm:ss")
			})
			res.json({
				ok:1,
				msg:"添加成功"
			})
		}else{
			res.json({
				ok:-1,
				msg:"微博内容不允许重复"
			})
		}
		
		
	}catch (err){
		console.log("err",err);
		res.json({
			ok:-1,
			msg:"网络连接异常"
		})
	}
	
})
// 获取微博
app.get("/weibo/:pageNo",async (req,res)=>{
	try{
		// 1- 接收数据
		// 页码
		let pageNo = req.params.pageNo/1;
		// 每页显示的条数
		const pageSize = req.query.pageSize/1;
		// 2- 求总页数
		// 总条数
		const total = await contentListM.count();
		// 总页数
		let pageSum = Math.ceil(total/pageSize);
		if(pageSum<1) pageSum = 1;// 总页数不允许小于1
		// 3- 整理当前页
		if(pageNo<1) pageNo = 1;// 当前页不允许小于1
		if(pageNo>pageSum) pageNo = pageSum;// 当前页不允许大于总页数
		console.log(11111,pageNo);
		// 4- 调取微博列表
		const contentList = await contentListM.find({
			sortObj:{
				addTime:-1
			},
			limit:pageSize,
			skip:(pageNo-1)*pageSize
		})
		res.json({
			ok:1,
			contentList,
			pageSum,
			pageNo,
			msg:"成功"
		})
	}catch (err){
		console.log(err);
		res.json({
			ok:-1,
			msg:"网络连接异常"
		})
	}
})
// 删除微博
app.delete("/weibo/:id",async (req,res)=>{
	try{
		const {id} = req.params;
		await contentListM.deleteOneById(id);
		res.json({
			ok:1,
			msg:"删除成功"
		})
	}catch (err){
		res.json({
			ok:-1,
			msg:"删除失败"
		})
	}
	
})
// 修改微博
app.put("/weibo/:id/:type",async (req,res)=>{
	try{
		const {id,type} = req.params;
		//  方案1
		// let $inc = {
		// 	topNum:1
		// }
		// if(type/1 === 2){
		// 	$inc={
		// 		downNum:1
		// 	}
		// }
		// await contentListM.updateOneById(id,{
		// 	$inc
		// })
		
		// 方案2
		await contentListM.updateOneById(id,{
			$inc:{
				[type/1===1?"topNum":"downNum"]:1
			}
		})
		res.json({
			ok:1,
			msg:"修改成功"
		})
	}catch (err){
		res.json({
			ok:-1,
			msg:"网络连接异常"
		})
	}

	
})
app.listen(8090,function(){
	console.log("success");
})

