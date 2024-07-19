// 导入mockRequest请求
import { mockRequest } from "@/request";

const getTodaySell = function () {
    return mockRequest("/today/sell");
}

// 暴漏数据
export {
    getTodaySell
};