const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {

    // 模式
    mode: 'development',

    // 自动开启服务
    devServer: {
        host: '127.0.0.7',
        port: '8080',
        open: true,
        // 开发中，允许前端路由使用 history 模式
        historyApiFallback: true
    }
})
