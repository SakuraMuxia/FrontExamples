const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync') //同步方式读取文件的函数

const adapter = new FileSync('db.json') //实例化
const db = low(adapter)

// 初始化
db.defaults({ posts: [], user: {} }).write();



// 写入数据 create
db.get('posts').push({ id: 100, title: 'lowdb is awesome'}).write()
// db.get('posts').unshift({ id: 101, title: 'lowdb is awesome'}).write()

// 改 update 使用数组的方法进行修改
// db.set('posts[1].title', '高小乐').write();

// 读取 r
console.log(db.get('posts').value());

// 删除 curd
db.get('posts').remove({id:1}).write();