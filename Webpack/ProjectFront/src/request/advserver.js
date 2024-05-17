// 导入 axios
import axios from 'axios';
// 这里不用渲染，只做js对象使用，不用导入css文件
import toastr from 'toastr';

// 创建 axios 实例
const advServer = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// 给 实例设置响应拦截器 ，返回值是一个promise对象。
advServer.interceptors.response.use(res => {
    // 如果响应的ok状态不等于1，异常情况
    if (res.data.ok !== 1) {
        toastr.error(res.data.msg);
        // 返回不改变状态的 Promise，执行链结束了
        return new Promise(()=>{});
    }

    // 如果响应的ok状态等于1，正常情况
    // 返回值 作为 promise的result
    return res.data;

}, error => {
    toastr.error('请求错误！');
    // 返回不改变状态的 Promise，执行链结束了
    return new Promise(()=>{});
});

// 暴露实例
export default advServer;
