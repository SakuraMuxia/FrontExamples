const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    // 入口
    entry: path.resolve(__dirname, '../src/app.js'),

    // 出口
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:12].js',
        clean: true,
        // 设置打包后的js文件的路径前加 / 在webpack官网 - 配置 - 出口配置项中可以查阅到
        // 只有把dist作为根目录才能使用
        publicPath: '/'
    },

    // loader
    module: {
        rules: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                options: {
                    // 这里的 data 变量对应 模版文件函数中的 变量 
                    // import indexV from  './views/index.ejs';
                    // console.log(indexV); indexV = function(data)
                    variable: 'data',
                    // 自定义定界符 替代 <% %>	执行其中语句
                    //interpolate : '\\{\\{(.+?)\\}\\}', 
                    // 自定义定界符 替代 <%= %>  原样显示 
                    //evaluate : '\\[\\[(.+?)\\]\\]'
                }
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }

        ]
    },
    // 插件
    plugins: [

        // 打包 html 资源
        new HtmlWebpackPlugin({
            // 起始html文件 
            template: path.resolve(__dirname, '../public/index.html'),
            // 将 script 放在 body 结尾
            inject: 'body',
            // 压缩优化
            minify: {
                removeAttributeQuotes: true,  // 去除引号
                removeComments: true, // 去除注释
                // collapseWhitespace: true, // 代码折叠
            },
            // 自定义选项
            title:"Hanser Angle"
        }),
        
        // 将源目录（public）中的文件复制到目标目录（项目输出目录）
        new CopyWebpackPlugin({
            patterns: [
                { 
                    // 源目录
                    from: path.resolve(__dirname, '../public'), 
                    // 目标目录
                    to: path.resolve(__dirname, '../dist'),
                    globOptions: {
                        ignore: ['**/**.html']  // 忽略所有的html文件
                    }
                },
            ],
        }),

    ],
    // 解析
    resolve: {
        // 设置可以省略的扩展名
        extensions: ['.js', '.json', '.ejs'],
        // 设置路径别名
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
}