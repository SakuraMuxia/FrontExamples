import axios from "axios";

const mz = axios.create({
    baseURL: "https://m.maizuo.com/",
    params:{
        k: Date.now()
    },
    headers: {
        "X-Client-Info": JSON.stringify({ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16905280922820767016288257", "bc": "310100" }),
        "X-Host": "mall.film-ticket.film.list"
    }
})

// 设置拦截器
mz.interceptors.response.use(res => {
    return res.data;
})

// 暴漏
export default mz;