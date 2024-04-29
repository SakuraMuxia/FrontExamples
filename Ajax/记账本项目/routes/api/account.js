var express = require('express');
var router = express.Router();
const multer = require('multer');

// 导入 accounts 结合对应的模型
const AccountModel = require('../../models/accounts');


// 获取用户对应账单列表
router.get('/account/:uid',(req,res) => {
    //获取所有的账单信息
    const uid = req.params.uid;
    //读取集合信息
    AccountModel.find({userid: uid}).sort({time: -1}).exec((err,data)=>{
        if(err){
            res.json({
                code: '1001',
                msg: '读取失败~~',
                data: null
            });
            return;
        };
        //响应成功的提示
        res.json({
            //响应编号
            code:  '0000',
            //响应的信息
            msg: '读取成功',
            //响应的数据
            data: data
        });
    });
});


//新增记录
const upload = multer({ dest: 'uploads/' });
// 执行添加
router.post('/account/:uid', upload.single('avator'),(req, res) => {
    //表单验证
    const userid = req.params.uid;
    AccountModel.create({userid:userid,...req.body}, (err, data) => {
        // 输出响应体
        console.log(req.body);
        if (err) {
            // 响应一个json数据
            res.json({
                code: '1001',
                msg: '读取失败~~',
                data: null
            });
            return;
        } else {
            res.json({
            code: '0000',
            msg: '创建成功',
            data: data
            })
        }
    })

});

// 执行删除
router.delete('/account/:id', (req, res) => {
    //获取 params 的 id 参数
    let id = req.params.id;
    // 从数据库中删除指定的数据
    AccountModel.deleteOne({_id:id}, (err, data) => {
        if(err) {
            res.json({
                code: '1003',
                msg: '删除账单失败',
                data: null
            })
            return;
        }else{
            res.json({
                code: '0000',
                msg: '删除成功',
                data: {}
            })
        }
    });
});

//获取单个账单信息
router.get('/account/:id', (req, res) => {
    //获取 id 参数
    let {id} = req.params;
    //查询数据库
    AccountModel.findById(id, (err, data) => {
        if(err){
            return res.json({
                code: '1004',
                msg: '读取失败~~',
                data: null
            })
        }
        //成功响应
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data  
        })
    })
});

//更新单个账单信息
router.patch('/account/:id', (req, res) => {
    //获取 id 参数值
    let {id} = req.params;
    //更新数据库
    AccountModel.updateOne({_id: id}, req.body, (err, data) => {
        if(err){
            return res.json({
                code: '1005',
                msg: '更新失败~~',
                data: null
            })
        }
        //再次查询数据库 获取单条数据
        AccountModel.findById(id, (err, data) => {
            if(err){
                return res.json({
                code: '1004',
                msg: '读取失败~~',
                data: null
                })
            }
            //成功响应
            res.json({
                code: '0000',
                msg: '更新成功',
                data: data  
            })
        })
    });
});

module.exports = router;