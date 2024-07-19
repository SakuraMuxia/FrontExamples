// 导入mockRequest请求
import { mockRequest } from "@/request";

const getFocusList = function(){
    return mockRequest("/adv/focus");
}

// 暴漏数据
export {
    getFocusList
};