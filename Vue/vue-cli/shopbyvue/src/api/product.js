// 导入axios
import { sphRequest, mockRequest ,nodeRequest} from "@/request";
// 获取分类列表数据
const getBaseCategoryList = function(){
    return sphRequest("/product/getBaseCategoryList");
}
// 获取楼层数据
const getFloorList = ()=>{
    return mockRequest("/floorList")
}
// 获取rank数据
const getRankList = () =>{
    return mockRequest("/rankList")
}
// 获取猜你喜欢数据
const getLikeList = function(pageNo,pageSize){
    return nodeRequest('/likeList',{
        params:{
            pageNo,
            pageSize
        }
    })
}
// 暴漏数据
export { 
    getBaseCategoryList,
    getFloorList,
    getRankList,
    getLikeList
}