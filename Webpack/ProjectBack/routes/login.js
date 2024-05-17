const express = require('express');
const adminM = require("../models/admin");
const utils = require("../utils");

const configs = require('../configs/index');


const router = express.Router();

// 登陆接口
router.post("/login", async (req, res) => {
	try {
		// 接收管理员账号以及密码
		let {adminName, passWord} = req.body;
		passWord = utils.getMd5(passWord);
		const count = await adminM.count({
			adminName,
			passWord
		});
		if (count === 1) {
			// 记录最后一次登陆的时间
			await adminM.updateOne({adminName, passWord}, {lastLoginTime: utils.getNowTime()})
			res.json({
				ok: 1,
				msg: "登陆成功",
				token: utils.getToken({
					adminName,
				}, configs['token_expires'])
			});
		} else res.sendJson("账号或密码错误");
	} catch (err) {
		res.sendJson();
	}
})




module.exports = router;
