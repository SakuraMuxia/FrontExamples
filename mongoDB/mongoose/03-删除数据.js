// 1. 导入 mongoose 模块
const mongoose = require('mongoose');
// 不想有警告，可以写下面代码
mongoose.set('strictQuery', false);

// 2. 连接 MongoDB 服务
mongoose.connect('mongodb://root:sakura@192.168.1.38:27017/hanser?authSource=admin');

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

    // 6. 使用模型进行数据的 CURD
    // // 删除满足条件的第一个文档
    // songsModel.deleteOne({author:'林飞如'}, (err, res) => {
    //     if (err) {
    //         console.log('删除文档失败！');
    //     } else {
    //         console.log('删除文档成功：', res);
    //         // 关闭连接 实际开发不需要
    //         // mongoose.connection.close();
    //     }
    // });

    
    // 删除满足条件的所有文档
    // songsModel.deleteMany({author:'林飞如'}, (err, res) => {
    //     if (err) {
    //         console.log('删除文档失败！');
    //     } else {
    //         console.log('删除文档成功：', res);
    //         // 关闭连接 实际开发不需要
    //         // mongoose.connection.close();
    //     }
    // });

    // 删除所有的文档
    songsModel.deleteMany({}, (err, res) => {
        if (err) {
            console.log('删除文档失败！');
        } else {
            console.log('删除文档成功：', res);
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