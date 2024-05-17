const express = require('express');
const adminM = require("../models/admin");
const middleware = require("../middleware");
const utils = require("../utils");
const {adminLoginAuth} = require('../configs');


const router = express.Router();

// 是否验证登录
const loginAuth =  adminLoginAuth ? middleware.author() : (r,s,n) => n();

// 添加管理员
router.post("/admin", loginAuth, async (req, res) => {
	try {
		// 接收数据
		const {adminName, passWord} = req.body;
		// 管理员账号是否已经存在
		const count = await adminM.count({adminName});
		if (count > 0) res.sendJson("管理员账号已经存在！");
		else {
			const regTime = utils.getNowTime();
			await adminM.insertOne({
				adminName,
				passWord: utils.getMd5(passWord),
				regTime,
				lastLoginTime: regTime
			});
			res.sendJson("添加管理员成功", 1);
		}
	} catch (err) {
		console.log(err);
		res.sendJson('管理员添加失败', -1);
	}
	
})

// 获取管理员列表,
router.get("/admin", loginAuth, (req, res) => {
	try {
		adminM.find({
			sortObj: {
				regTime: -1
			}
		}).then(data => {
			res.json({
				ok: 1,
				data
			})
		})
	} catch (err) {
		res.sendJson('数据获取失败');
	}
	
})

// 根据ID删除管理员
router.delete("/admin/:id", loginAuth, async (req, res) => {
	try {
		const {id} = req.params;
		await adminM.deleteOneById(id);
		res.sendJson("删除成功", 1);
	} catch (err) {
		console.log(err);
		res.sendJson('删除失败');
	}
})


// 修改管理员密码
router.patch('/changepwd', loginAuth, async(req, res) => {
	try {
		// 从请求体中获取数据
		const {id, oldPwd, newPwd} = req.body;
		// 验证旧密码是否正确
		const adminInfo = await adminM.findById(id);
		if (adminInfo.passWord !== utils.getMd5(oldPwd)) {
			res.sendJson('原密码不正确');
			return;
		}
		// 执行修改
		await adminM.updateOneById(id, {passWord: utils.getMd5(newPwd)});
		res.sendJson('密码修改成功', 1);

	} catch {
		res.sendJson('修改失败');
	}
})
module.exports = router;
