const mongoose = require("mongoose");
const Db = require("../");// 引入上一级目录下的index.js
// 1- 生成Schema
const schema = new mongoose.Schema({
	// 微博内容
	content:{
		type:String,
		required:true,
		unique:true
	},
	// 顶
	topNum:{
		type:Number,
		default:0
	},
	// 踩
	downNum:{
		type:Number,
		default:0
	},
	// 创建时间
	addTime:{
		type:Number,
		required:true
	}
},{
	versionKey:false// 省略__v(该条文档的版本标识）
})

// 2- 生成model,如果省略第三个参数，那么你的集合名字为contentlists
const model = mongoose.model("contentList",schema,"contentList");
module.exports = new Db(model);