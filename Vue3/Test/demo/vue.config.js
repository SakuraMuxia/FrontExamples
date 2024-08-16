const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave:false,
    devServer: {
        open: true,// 自动打开浏览器
        port: 80,// 指定端口号
        host: "zhangpeiyue.com",// 指定host
    }
})
