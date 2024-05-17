const md5 = require("md5");
const jwt = require("jwt-simple");
const moment = require("moment");


const KEY = "%^&*()(&*&)(*&)(*"
module.exports = {
	getMd5(str){
		return md5(str+KEY);
	},
	getNowTime(){
		return moment().format("YYYY-MM-DD HH:mm:ss")
	},
	// 生成token,第一个参数是荷载的数据，第二个参数是过期的时间（默认10秒）
	getToken(payload,exp=60*60*24){
		return jwt.encode({
			...payload,
			exp:Date.now()/1000+exp
		},KEY)
	},
	// 解析token
	resolveToken(token){
		return new Promise((resolve)=>{
			resolve(jwt.decode(token,KEY))
		})
	}
}