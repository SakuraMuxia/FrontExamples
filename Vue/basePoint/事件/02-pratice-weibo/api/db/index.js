const mongoose = require("mongoose");
// 1- 连接库
// 2- 操作数据库
class Db {
	constructor(model) {
		this.model = model;
	}
	
	_connect() {
		// 判断是否已经连接：如果已连接返回成功Promise,未连接再去连接数据库。
		if (mongoose.connection.readState === 1)
			return Promise.resolve()
		// 连接 数据库
		return mongoose.connect("mongodb://root:sakura@192.168.1.38:27017/weibo?authSource=admin")
	}
	
	// 添加数据
	// insertObj：添加的内容
	async insertOne(insertObj) {
		await this._connect();
		return this.model(insertObj).save();
	}
	
	// 根据条件求文档条数
	async count(whereObj) {
		await this._connect();
		return this.model.count(whereObj);
	}
	
	// whereObj:查找条件,
	// sortObj：排序的条件
	// limit：显示条数
	// skip：跳过的条数
	async find(options = {}) {
		const {whereObj={},sortObj={},limit=0,skip=0} = options;
		await this._connect();
		return this.model.find(whereObj).sort(sortObj).skip(skip).limit(limit);
	}
	// 根据Id删除记录
	async deleteOneById(_id){
		await this._connect();
		return this.model.deleteOne({_id})
	}
	// 修改
	async updateOneById(_id,upObj){
		await this._connect();
		return this.model.updateOne({_id},upObj);
	}
	
	
}

module.exports = Db;