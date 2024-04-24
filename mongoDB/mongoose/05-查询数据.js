// 1. 导入 mongoose 模块
const mongoose = require('mongoose');
// 不想有警告，可以写下面代码
mongoose.set('strictQuery', false);

// 2. 连接 MongoDB 服务
mongoose.connect('mongodb://127.0.0.1:27017/project04');

// 3. 监听连接成功的事件和连接失败的事件
// 当连接成功事件触发
mongoose.connection.on('open', () => {
    // 4. 创建文档结构 对应 songs 集合
    const songsSchema = new mongoose.Schema({
        author: String,
        language: String,
        duration: Number,
        hot: Number,
        title: String
    });

    // 5. 根据 schema 创建与集合对应的模型
    const songsModel = mongoose.model('songs', songsSchema);

    
    // 查询单条数据
    // songsModel.findOne({author:'高小乐'}, (err, res) => {
    // 根据ID查询单条数据
    // songsModel.findById('647ae9d013ab34ca2595e162', (err, res) => {
    
    // 查询多条数据
    //songsModel.find({author:'高小乐'}, (err, res) => {
    
    // 查询所有的数据
    // songsModel.find((err, res) => {
    
    // 指定查询的字段
    // songsModel.find({hot: {$gt:500}}).select({_id:0, author:1,title:1}).exec((err, res) => {
    
    // 排序
    //songsModel.find().select({_id:0, title:1,hot:1}).sort({hot:1}).exec((err, res) => {
    
    // 截取数据
    songsModel.find().select({_id:0, title:1,hot:1}).sort({hot:1}).skip(90).limit(10).exec((err, res) => {
        if (err) {
            console.log('查询失败！');
        } else {
            console.log('查询成功');
            console.log(res);
            console.log(res.length);
        }
    });

    

});

// 当连接失败事件触发
mongoose.connection.on('error', err => {
    console.log('数据库连接失败！');
    throw err;
});