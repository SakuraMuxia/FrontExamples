// 导入基本配置
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 

module.exports = merge(baseConfig,{
    // loader
    module: {
        
        rules: [
            // 从 js 中抽离 css，写入 css 文件
            {
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader","less-loader"],
            },
        ]
    },

    // 插件
    plugins: [
        // 创建 css 文件 从 js 中抽离 css，写入 css 文件
        new MiniCssExtractPlugin({
            filename: "static/css/main-[hash:12].css",	// 定义输出文件名和目录
        })
    ],
    // 压缩css
    optimization: {
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
         `...`,
          new CssMinimizerPlugin(),
        ],
    },

    // 模式
    mode: 'production',

    // sourcemap
    devtool: 'source-map',// 行和列都映射


})
