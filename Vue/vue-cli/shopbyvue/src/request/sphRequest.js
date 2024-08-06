import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getUserTempId } from "@/utils/auth";

// 创建一个实例
const sphRequest = axios.create({
    baseURL: "/api",
    timeout: 5000
});
// 请求拦截器
sphRequest.interceptors.request.use(config => {
    nprogress.start();// 开启进度条
    // 在请求投中配置uuid
    config.headers.userTempId = getUserTempId()
    // 返回请求配置项
    return config;
});
// 响应拦截器
sphRequest.interceptors.response.use(response => {
    nprogress.done();// 结束进度条
    return response.data;// 返回响应体
},err=>{
    nprogress.done();// 结束进度条
    alert(err);//提示错误信息
    return new Promise(() => { });//中断Promise
})
// 暴漏数据
export default sphRequest;