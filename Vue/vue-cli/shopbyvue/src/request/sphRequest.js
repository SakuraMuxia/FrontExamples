import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getToken, getUserTempId, rmToken } from "@/utils/auth";
import store from "@/store";
import { Message } from "element-ui";

// 创建一个实例
const sphRequest = axios.create({
    baseURL: "/api",
    timeout: 5000
});
// 请求拦截器
sphRequest.interceptors.request.use(config => {
    // 开启进度条
    nprogress.start();
    // 在请求头中配置uuid
    config.headers.userTempId = getUserTempId();
    // 在请求头中配置token
    const token = getToken();
    if (token){
        config.headers.token = token;
    }
    // 返回请求配置项
    return config;
});
// 响应拦截器
sphRequest.interceptors.response.use(response => {
    // 结束进度条
    nprogress.done();

    // 处理token异常
    if (response.data.code === 208){
        // 清空token,跳转到登陆页面
        store.commit("user/OUT_LOG")
        // 提示
        Message.warning("身份已过期，请重新登陆")
    }
    
    // 返回响应体
    return response.data;
},err=>{
    // 结束进度条
    nprogress.done();
    //提示错误信息
    Message.error(err)
    //中断Promise
    return new Promise(() => { });
})
// 暴漏数据
export default sphRequest;