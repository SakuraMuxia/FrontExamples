// 导入api
import { getBaseCategoryList, getFloorList, getRankList,getLikeList} from '@/api/product';

// 定义商品的数据状态
const state = {
    // 首页分类列表
    categoryList:[],
    // 楼层数据状态
    floorList:[],
    // rank的数据仓库
    rankList:[],
    // 猜你喜欢
    likeList:[],
    pageSum:0,
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
    },
    // 修改rank中的数据
    SAVE_RANK_LIST(state, rankList) {
        state.rankList = rankList;
    },
    // 修改like中的数据
    SAVE_LIKE_LIST(state, likeList) {
        state.likeList = likeList;
    },
    // 修改pageSum的数据
    SAVE_SUM(state, pageSum){
        state.pageSum = pageSum;
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
    },
    // 使用api获取rankList说几句
    async getRankListAsync({ commit }) {
        const { data } = await getRankList();
        commit("SAVE_RANK_LIST", data);
    },
    // 使用api获取likeList说几句
    async getLikeListAsync({ commit },pageNo,pageSize=6) {
        try {
            const { data , pageSum} = await getLikeList(pageNo,pageSize);
            commit("SAVE_LIKE_LIST", data);
            commit("SAVE_SUM", pageSum);
        } catch (error) {
            console.error("Failed to fetch like list:", error);
        }
    }
}
// 暴漏数据，导出模块
export default {
    namespaced:true,
    state,
    mutations,
    actions,
}