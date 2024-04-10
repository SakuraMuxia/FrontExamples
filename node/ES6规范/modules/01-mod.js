const usre = {
    name: 'Yousa',
    age: 19,
    address: '上海',
    say() {
        console.log(this.name + '住在' + this.address);
    }
}

// 暴露一个数据  export default 语法只能写一遍
// export default 100;
// export default [10,20,30,40,50];
export default usre;