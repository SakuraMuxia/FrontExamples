const path = require("path");
const fs = require("fs");
const moment = require("moment");
const formidable = require("formidable");

const utils = require("../utils");


module.exports = {
	sendJson(){
		return function(req,res,next){
			res.sendJson = function(msg="操作失败",ok=-1){
				res.json({
					ok,
					msg
				})
			}
			next();
		}
	},
	author(){
		return (req,res,next)=>{
			utils.resolveToken(req.headers.token).then(()=>{
				next();
			}).catch(err=>{
				res.sendJson("登陆信息异常，请重新登陆",-2);
			})
		}
	},
	uploadPic(picName){
		return function(req,res,next){
		
			const timeDir = moment().format("YYYY/MM/DD");
			// 指定存放的目录
			const uploadDir = path.join(__dirname,"../upload",timeDir);
			// 判断目录是否存在,如果不存在，创建目录
			if(!fs.existsSync(uploadDir)){
				fs.mkdirSync(uploadDir,{recursive:true});
			}
			// 生成实例
			const form = new formidable.IncomingForm({
				// 指定保存文件的目录
				uploadDir,
				// 保留文件扩展名
				keepExtensions: true
			})
			// 将请求对象进行转换，转换结束后会调用第二个参数（函数）,传递表单数据
			form.parse(req,async function(err,params,file){
				if (err) {
					res.sendJson('数据解析失败');     
					return;    
				}

				req.params = params;
				// 获取图片信息对象
				const picInfo = file[picName];

				if (!picInfo) {
					res.sendJson('请上传图片');
					return;
				}

				// 判断提交的文件是否为空
				if(picInfo.size>0){
					// 获取文件扩展名
					const extname = path.extname(picInfo.newFilename);
					// 指定接收的文件类型
					const extnameArr = [".jpg",".png",".gif"];
					// 判断文件类型是否正确
					if(extnameArr.includes(extname.toLowerCase())){
						
						req.params[picName]=timeDir+"/"+picInfo.newFilename;
						next();
					}else{
						fs.unlinkSync(path.join(uploadDir,picInfo.newFilename));
						res.sendJson("请提交正确的图片类型，比如：.jpg,.png,.gif");
					}
				}else{
					// 删除空文件
					fs.unlinkSync(path.join(uploadDir,picInfo.newFilename));
					next();
				}
			})
		
		}
	}
}