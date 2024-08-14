import { sphRequest } from "@/request";

// 获取用户交易信息：
const getTradeList = () => {
    return sphRequest.get("/order/auth/trade");
}

// 暴漏数据
export {
    getTradeList
}