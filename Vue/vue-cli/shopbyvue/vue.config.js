const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,
        host: "127.0.0.1",
        port: 8088
    },
    pages: {
        index: {
            // page 的入口
            entry: 'src/index.js',
            // 设置网站标题
            title: "尚品汇"
        }
    }
})
