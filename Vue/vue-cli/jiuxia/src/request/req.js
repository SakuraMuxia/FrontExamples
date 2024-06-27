import axios from "axios";

const vt = axios.create({
    baseURL:"http://127.0.0.1:8001",
    timeout: 10000,
})

// 设置拦截器
vt.interceptors.response.use(res =>{
    return res;
})

// 暴漏
export default vt;