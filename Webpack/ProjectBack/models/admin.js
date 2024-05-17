const mongoose = require("mongoose");
const Db = require("../db");

const schema = new mongoose.Schema({
	// 管理员账号
	adminName:{
		type:String,
		unique:true,
		required:true
	},
	// 管理员密码
	passWord:{
		type:String,
		required:true
	},
	// 注册时间
	regTime:{
		type:String,
		required:true
	},
	// 最后登陆时间
	lastLoginTime:{
		type:String,
		required:true
	}
},{
	versionKey:false
})
const model = mongoose.model("admins", schema);
module.exports = new Db(model);