const fs = require('node:fs/promises');
const path = require('path');
const express = require('express');

const formidable = require("formidable");

const advM = require("../models/adv");
const middleware = require("../middleware");
const utils = require("../utils");
const {advLoginAuth} = require('../configs');


const router = express.Router();

// 是否验证登录
const loginAuth =  advLoginAuth ? middleware.author() : (r,s,n) => n();


// 添加广告接口
router.post("/adv", loginAuth, middleware.uploadPic("advPic"), async (req, res) => {
	if (req.params.advPic) {
		const addTime = utils.getNowTime();
		// 插入数据
		await advM.insertOne({
			...req.params,
			advType: req.params.advType / 1,
			advOrder: req.params.orderNum / 1,
			addTime,
			upTime: addTime,
		})
		res.sendJson("添加成功", 1);
	} else {
		res.sendJson("请选择要上传的图片")
	}
	
})


// 获取广告列表
router.get("/adv", loginAuth, async (req, res) => {
	try {
		// 接收数据
		let {pageNo = 1, pageSize = 3, keyword} = req.query;
		pageNo = pageNo / 1;
		pageSize = pageSize / 1;

		let whereObj = {};
		if(keyword){
			whereObj.advTitle = new RegExp(keyword)
		}

		// 求总页数
		const count = await advM.count(whereObj);
		let pageSum = Math.ceil(count / pageSize);
		if (pageSum < 1) pageSum = 1;
		if(pageNo<1) pageNo=1;
		if(pageNo>pageSum) pageNo = pageSum;
		// 求广告列表
		const advList = await advM.find({
			whereObj,
			sortObj:{
				orderNum:-1,
				addTime:-1
			},
			limit:pageSize,
			skip:(pageNo-1)*pageSize
		});
		res.json({
			ok:1,
			data:advList,
			pageNo,
			pageSum
		})
	} catch (err) {
		res.sendJson('数据获取失败');
	}
	
})

// 根据ID获取广告信息
router.get("/adv/:id", loginAuth, async (req,res)=>{
	try {
		const advInfo = await advM.findById(req.params.id);
		res.json({
			ok:1,
			data:advInfo
		})
	} catch {
		res.sendJson('数据获取失败')
	}
	
})

// 完成修改广告接口
router.put("/adv", loginAuth, middleware.uploadPic("advPic"),async(req,res)=>{
	try {
		await advM.updateOneById(req.params.id,{
			...req.params,
			upTime:utils.getNowTime(),
			advType:req.params.advType/1,
			orderNum:req.params.orderNum/1
		})
		res.json({
			ok:1,
			msg:"修改成功"
		})
	} catch (err) {
		res.sendJson('修改失败');
	}
	
});

// 删除广告
router.delete('/adv/:id', loginAuth, async (req, res) => {
	try {
		// 先获取广告信息
		const advInfo = await advM.findById(req.params.id);
		// 删除图片
		await fs.unlink(path.resolve(__dirname, '../upload', advInfo.advPic));
		// 删除数据
		await advM.deleteOneById(req.params.id);

		res.sendJson('删除成功', 1);

	} catch (err) {
		console.log(err);
		res.sendJson('删除失败');
	}

});

module.exports = router;
