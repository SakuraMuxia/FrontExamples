const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');
module.exports = merge(baseConfig, {

    // 模式
    mode: 'development',

    // sourceMap
    devtool:'cheap-module-source-map',
    // 插件
    plugins: [
        new webpack.DefinePlugin({
            // SERVICE_URL: 全局变量 "/api" ，后边的默认是代码片段 /api 会执行，然后报错，经过stringify处理会转为 字符串，
            SERVICE_URL: JSON.stringify('/api')
        })
    ],
    // 自动开启服务
    devServer: {
        host: '127.0.0.7',
        port: '8080',
        open: true,
        // 开发中，允许前端路由使用 history 模式
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://192.168.1.198:8088',
                secure: false,
                pathRewrite: { '^/api': '' },
            },
        ]
    }
})
