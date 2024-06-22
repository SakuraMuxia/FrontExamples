import axios from 'axios'

export const gitReq = axios.create({
    baseURL:"https://api.github.com",
    timeout:10000
})

// 设置拦截器
gitReq.interceptors.response.use(res => {
    return res.data;
})
