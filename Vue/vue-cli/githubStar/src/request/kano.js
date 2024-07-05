import axios from "axios";
axios.defaults.baseURL = "https://api.github.com";
// 设置拦截器
axios.interceptors.response.use(res => {
    // 直接放行
    return res
});
export default axios;