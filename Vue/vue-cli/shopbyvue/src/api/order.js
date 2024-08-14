import { sphRequest } from "@/request";

// 获取用户交易信息：
const getTradeList = () => {
    return sphRequest.get("/order/auth/trade");
}

// 提交订单的接口 tradeNo:交易号，body：请求体
export const postSubmitOrder = (tradeNo,body) => {
    return sphRequest.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,body)
}

// 暴漏数据
export {
    getTradeList
}