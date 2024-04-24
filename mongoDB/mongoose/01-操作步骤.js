// 1. 导入 mongoose 模块
const mongoose = require('mongoose');
// 不想有警告，可以写下面代码
mongoose.set('strictQuery', false);
// 2. 连接 MongoDB 服务
mongoose.connect('mongodb://root:sakura@192.168.1.38:27017/hanser?authSource=admin');



// 3. 监听连接成功的事件和连接失败的事件
// 当连接成功事件触发
mongoose.connection.on('open', () => {
    // 4. 创建文档结构 对应users集合
    const usersSchema = new mongoose.Schema({
        name: String,
        age: Number,
        address: String,
        ctime: Date
    });

    // 5. 根据 schema 创建与集合对应的模型
    const usersModel = mongoose.model('users', usersSchema);

    // 6. 使用模型进行数据的 CURD
    // 向集合中添加一个文档
    usersModel.create({
        name: '高小乐',
        age: 101,
        address: '上海',
        ctime: Date()
    }, (err, res) => {
        if (err) {
            console.log('添加文档失败！');
        } else {
            console.log('添加文档成功！添加的数据是：', res);
            // 关闭连接 实际开发不需要
            // mongoose.connection.close();
        }
    });

});

// 当连接失败事件触发
mongoose.connection.on('error', err => {
    console.log('数据库连接失败！');
    throw err;
});