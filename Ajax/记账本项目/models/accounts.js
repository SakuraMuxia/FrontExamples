// 导入模块
const mongoose = require('mongoose');

// 创建 Schema
const accountsSchema = new mongoose.Schema({
    title: String,
    remarks: String,
    type: Number,
    account: Number,
    time: String,
    userid: mongoose.Schema.Types.ObjectId
});
// 创建Model 并对外暴露
module.exports = mongoose.model('accounts', accountsSchema);