// 导入axios对象
import axios from "axios";
// 创建axios实例 设置全局配置项目
const mz = axios.create({
    baseURL: "https://m.maizuo.com",
    headers: {
        "X-Host": "mall.film-ticket.film.list",
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"16903322302568072615428097"}'
    }
});
// 设置响应拦截器
mz.interceptors.response.use(res => {
    return res;
});
// 暴漏数据 实例
export default mz;