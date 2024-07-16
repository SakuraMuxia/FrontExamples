// 导入axios
import { sphRequest } from "@/request";
// 暴漏数据
export const getBaseCategoryList = function(){
    return sphRequest("/product/getBaseCategoryList");
}