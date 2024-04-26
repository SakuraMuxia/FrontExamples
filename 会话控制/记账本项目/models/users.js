// 导入模块
const mongoose = require('mongoose');

// 创建schema
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    userpwd: String
});

// 创建model并且暴露
module.exports = mongoose.model('user',userSchema);