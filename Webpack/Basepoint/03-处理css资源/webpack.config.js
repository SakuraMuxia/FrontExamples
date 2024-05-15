const path = require('path');

// 使用ES6语法 暴漏数据
module.exports = {
     /********* 入口 **********/
    // 字符串指定单一入口
    entry: "./src/app.js",
    // 数组指定多入口
    // entry: ['./src/js/one.js', './src/js/two.js'],
    // 对象指定多入口
    // entry: {
    //     frist: './src/js/one.js',
    //     second: './src/js/two.js',
    // },

    /********* 出口 **********/
    output: {
        path: path.resolve(__dirname, './dist'),
        // 固定的输出文件名
        filename: 'index.js',
        // filename: '[name].js',
        // filename: '[name][hash:8].js',
        // filename: 'index-[hash:12].js',
        clean: true  // 每次打包会把清空原来的输出目录 
    },

    /********* loader **********/
    module: {
        rules: [
            {
                test: /\.css$/, // 匹配以 .css 结尾的文件
                use: ['style-loader', 'css-loader'],  // loader 的执行顺序是从右向左
            },
            {
                test: /\.less$/, // 匹配以 .less 结尾的文件
                use: ['style-loader', 'css-loader', 'less-loader'],
            }
        ]
    },
    /********* 插件 **********/
    /********* 模式 **********/
    mode: "development"

}