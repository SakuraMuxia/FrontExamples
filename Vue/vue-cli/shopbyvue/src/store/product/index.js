// 导入api
import { getBaseCategoryList,getFloorList} from '@/api/product';

// 定义商品的数据状态
const state = {
    // 首页分类列表
    categoryList:[],
    // 楼层数据状态
    floorList:[],
}
// 定义mutations
const mutations = {
    // 修改state中的首页分类列表
    UP_CATEGORY_LIST(state,categoryList){
        state.categoryList = categoryList
    },
    // 修改state中的楼层列表
    SAVE_FLOOR_LIST(state, floorList) {
        state.floorList = floorList;
    }
}
// 定义actions
const actions = {
    // 使用api接口获取数据
    async getBaseCategoryListAsync({commit},num=1){
        const { data } = await getBaseCategoryList();
        commit("UP_CATEGORY_LIST",data.splice(0,num));
    },
    // FloorList获取数据
    async getFloorListAsync({ commit }) {
        const { data } = await getFloorList();
        commit("SAVE_FLOOR_LIST", data);
    }
}
// 暴漏数据，导出模块
export default {
    namespaced:true,
    state,
    mutations,
    actions,
}