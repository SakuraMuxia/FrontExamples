// 导入axios请求
import { sphRequest } from "@/request";

// 获取用户交易信息：
const getTradeList = () => {
    sphRequest.get("/order/auth/trade");
}

// 暴漏数据
export {
    getTradeList
}