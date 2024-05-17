const {db} = require('../configs');

// 缺点：调用方法都需要传递model
const mongoose = require("mongoose");
async function connect(){
	if(mongoose.connection.readyState === 1) return;
	return mongoose.connect("mongodb://root:sakura@192.168.1.38:27017/atguigu?authSource=admin",{
		serverSelectionTimeoutMS:1000
	})
}
module.exports = class Db{
	constructor(model) {
		this.model = model;
	}
	async insertOne(insertObj){
		await connect();
		return this.model(insertObj).save();
	}
	async find(options={}){
		const {whereObj={},sortObj={},skip=0,limit=0} = options;
		await connect();
		return this.model.find(whereObj).sort(sortObj).skip(skip).limit(limit);
	}
	async findById(id){
		await connect();
		return this.model.findById(id);
	}
	async count(whereObj={}){
		await connect();
		return this.model.count(whereObj);
	}
	async deleteOneById(_id){
		await connect();
		return this.model.deleteOne({_id});
	}
	async updateOneById(_id,upObj){
		await connect();
		return this.model.updateOne({_id},upObj);
	}
	async updateOne(whereObj,upObj){
		await connect();
		return this.model.updateOne(whereObj,upObj);
	}
}

