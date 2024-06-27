const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 配置开发服务
	devServer: {
        port: 8086,
        host: "127.0.0.1",
        open: true,// 启动项目后会自动打开浏览器
    }
})
