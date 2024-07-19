// 导入axios
import { sphRequest, mockRequest} from "@/request";
// 获取分类列表数据
const getBaseCategoryList = function(){
    return sphRequest("/product/getBaseCategoryList");
}
// 获取楼层数据
const getFloorList = ()=>{
    return mockRequest("/floorList")
}
// 暴漏数据
export { 
    getBaseCategoryList,
    getFloorList
}