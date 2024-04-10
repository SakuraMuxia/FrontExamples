// 通过 给 moudle.exports 赋值暴露数据
const obj = {
    name: 'Hanser',
    age: 19,
    say() {
        console.log(this.name);
    }
}
// 暴漏数据
module.exports = obj;