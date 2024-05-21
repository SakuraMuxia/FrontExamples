const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require ('webpack');
module.exports = merge(baseConfig, {
    // loaders
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    // 插件
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.[hash:12].css'
        }),
        // BaseUrl
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify('http://api.fuming.site:54254')
        })
    ],
    // optimization: {
    //     minimizer: [
    //         // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
    //         `...`,
    //         new CssMinimizerPlugin(),
    //     ],
    // },
    // 模式
    mode: 'production',
    // sourceMap
    devtool:'source-map',
})