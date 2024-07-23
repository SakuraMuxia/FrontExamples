import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 创建一个实例
const nodeRequest = axios.create({
    baseURL: "/hanser",
    timeout: 5000
});
// 请求拦截器
nodeRequest.interceptors.request.use(config => {
    nprogress.start();// 开启进度条
    return config;
});
// 响应拦截器
nodeRequest.interceptors.response.use(response => {
    nprogress.done();// 结束进度条
    return response.data;// 返回响应体
}, err => {
    nprogress.done();// 结束进度条
    alert(err);//提示错误信息
    return new Promise(() => { });//中断Promise
})
// 暴漏数据
export default nodeRequest;