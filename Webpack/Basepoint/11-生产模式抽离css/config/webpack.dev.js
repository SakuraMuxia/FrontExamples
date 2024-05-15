// 导入基本配置
const baseConfig = require('./webpack.base');

module.exports = {
    // 使用拓展运算符，把base.config重新添加进来
    ...baseConfig,
    // 增加devServer配置
    devServer:{
        port:80,// 设置端口号
        host:"127.0.0.1",
        open:true,	// 自动在浏览器中打开页面
        compress:true,	// false关闭gzip压缩,true开启（默认）
        // open:["home.html"],	// 打开home.html.如果不指定默认打开的是index.html
    },

    /********* 模式 **********/
    mode: "development",
    // SourceMap
    devtool:'cheap-module-source-map',
}