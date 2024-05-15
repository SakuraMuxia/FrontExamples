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
            // 处理css资源
            {
                test: /\.css$/, // 匹配以 .css 结尾的文件
                use: ['style-loader', 'css-loader'],  // loader 的执行顺序是从右向左
            },
            {
                test: /\.less$/, // 匹配以 .less 结尾的文件
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            // 处理图片资源
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                  dataUrlCondition: {
                    maxSize: 20 * 1024 // 小于20kb的图片会被base64处理
                  }
                },
                generator: {
                    // 将图片文件输出到 static/images 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/images/[hash:20][ext][query]",
                },
            },
            // 处理字体资源
            {
                test: /\.(ttf|woff2?|woff|svg|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:12][ext][query]",
                },
            },
        ]
    },
    /********* 插件 **********/
    /********* 模式 **********/
    mode: "development"

}