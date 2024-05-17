const mongoose = require("mongoose");
const Db = require("../db");
const schema = new mongoose.Schema({
	// 广告名称
	advTitle:{
		type:String,
		required:true
	},
	// 广告链接
	advHref:{
		type:String,
		required:true
	},
	// 广告排序
	orderNum:{
		type:Number,
		default:0,
		required:true
	},
	// 广告图片
	advPic:{
		type:String,
		required:true
	},
	// 广告类型
	advType:{
		type:Number,
		required:true
	},
	// 添加时间
	addTime:{
		type:String,
		required:true
	},
	// 修改时间
	upTime:{
		type:String,
		required:true
	},
},{
	versionKey:false
})
const model = mongoose.model("advs", schema);
module.exports = new Db(model);