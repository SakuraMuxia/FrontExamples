const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {

    // 模式
    mode: 'production'
})