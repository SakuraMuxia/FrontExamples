module.exports = {
    // 数据库配置
    "db": {
        "address": "192.168.1.38",
        "username": "root",
        "pw":"sakura",
        "port": "27017",
        "dbname": "atguigu",
        "auth":"admin"
    },

    /**
     值是字符串，允许单个域名或所有域名，如：
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Origin": "http://localhost:8080",

     值是数组，允许多个域名，如：
     "Access-Control-Allow-Origin": ["http://shirly.com","http://localhost:8080"],

     */
    
    "Access-Control-Allow-Origin": '',
    
    // 是否开启验证,登录后才可以看到数据
    "adminLoginAuth": false,
    "advLoginAuth": true,

    // token 有效期， 单位s
    "token_expires": 3600*24,

    // http 服务的 IP 和 端口
    "bindIp": "0.0.0.0",
    "port": "8088"
}