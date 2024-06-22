import axios from 'axios'
import Vue from 'vue'

const mz = axios.create({
    baseURL:"https://m.maizuo.com/",
    timeout:10000,
});

// 设置拦截器
mz.interceptors.response.use(res => {
    return res.data;
})

Vue.prototype.$mz = mz;
