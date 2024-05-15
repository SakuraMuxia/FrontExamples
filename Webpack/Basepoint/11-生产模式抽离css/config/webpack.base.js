const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
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
        path: path.resolve(__dirname, '../dist'),
        // 固定的输出文件名
        filename: 'static/js/index.[hash:12].js',
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
            // 处理视频音频资源
            {
                test: /\.(mp3|mp4|webm|ogg)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/medias/[hash:12][ext][query]",
                },
            },
            // 处理所有HTML引入的资源
            {
                // 导入 html 文件内容所使用的的资源，如图片、音视频等
                test: /\.html$/i,
                use: ["html-loader"],
            },
            // 处理JS 语法 兼容性
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules代码不编译
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

        ]
    },
    /********* 插件 **********/
    plugins: [
        // 处理HTML文件
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            template: path.resolve(__dirname, "../public/index.html"),
            // 目标文件地址,目标文件会在输出目录的里面
            filename: 'index.html',
            // inject: false, 不引入js
            // 将script添加到body内的最后位置
            inject: 'body',
            hash:true,// 为JS文件增加后缀，可以去除缓存
            minify: {
                removeAttributeQuotes:true,// 移除双引号
                removeComments:true,// 移除注释
                // collapseWhitespace:true// 代码进行折叠
            }
        }),
        // 处理JS文件语法检查
        new ESLintPlugin({
          // 指定检查文件的根目录
      	  context: path.resolve(__dirname, "src"),
        })
    ],

}