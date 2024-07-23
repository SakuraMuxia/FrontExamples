const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        open: true,
        host: "127.0.0.1",
        port: 8088,
        proxy: {
            // 请求地址：http://sph-h5-api.atguigu.cn/api/product/getBaseCategoryList
            // 访问"/api"的路径，统一拼接为"http://sph-h5-api.atguigu.cn/api"
            "/api": {
                target: "http://sph-h5-api.atguigu.cn",
                changeOrigin: true
            },
            // 访问"/hanser"的路径，统一拼接为"http://127.0.0.1:9090/hanser"
            "/hanser":{
                target: "http://127.0.0.1:7070",
                // changeOrigin:true,
                pathRewrite:{
                    // http://127.0.0.1:7070 == http://127.0.0.1:7070/hanser
                    "^/hanser":""
                }
            }
        }
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
