// 导入api
import { getBaseCategoryList, getFloorList, getRankList, getLikeList, postProductList, getProductInfoById } from '@/api/product';

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
    // 搜索数据
    searchResult:{
        // 设置搜索数据的初始值，防止undefined报错
        trademarkList:[],
        pageNo:1,
        pageSize:1,
        total:1,
        totalPages:10,
    },
    // 商品信息
    productInfo:{
        // 商品详情
        skuInfo: {
            // 定义缩略图列表，防止出现undefined 报错
            skuImageList: [],
            // 定义商品属性列表，防止出现undefined 
            spuSaleAttrList:[],
        }
    }
}
// 定义mutations
const mutations = {
    // 修改productInfo中的配置信息,参数是 商品的颜色ID和版本ID
    UP_ATTR_LIST_BY_ID(state,{a1Id,a2Id}){
        // 找到一级信息 颜色或者版本
        const info = state.productInfo.spuSaleAttrList.find(v => v.id === a1Id);
        
        if (info){
            // 找到二级中spuSaleAttrValueList的isChecked标记是1的
            const spuSaleAttrValue1 = info.spuSaleAttrValueList.find(v=>v.isChecked === '1');
            // 把之前的isChecked标记更改为0
            spuSaleAttrValue1.isChecked = "0";
            // // 更改二级中选中的spuSaleAttrValueList的isChecked标记
            const spuSaleAttrValue2 = info.spuSaleAttrValueList.find(v=>v.id === a2Id);
            // // 如果当前值为1，说明你点击的是已经选中的配置
            if (spuSaleAttrValue2.isChecked === "1") return;
            spuSaleAttrValue2.isChecked = "1";
        }
    },
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
    },
    // 保存搜索结果
    SAVE_SEARCH_RESULT(state, result) {
        state.searchResult = result;
    },
    // 保存商品信息
    SAVE_PRODUCT_INFO(state,payload){
        state.productInfo = payload;
    },
    // 修改productInfo商品信息中的缩略图skuImageList中的属性isDefault用于显示选中
    SAVE_SKUIMAGE_DEFAULT(state,id){
        // 1- 将之前的选中项移除，isDefault标记修改为0
        state.productInfo.skuInfo.skuImageList.find(v => v.isDefault === "1").isDefault = "0";
        // 2- 根据id,将isDefault修改为1
        state.productInfo.skuInfo.skuImageList.find(v => v.id === id).isDefault = "1";
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
    },
    // 使用api获取搜索的数据
    async postProductListAsync({ commit }, body) {
        const { data } = await postProductList(body);
        commit("SAVE_SEARCH_RESULT", data);
    },
    // 使用api获取商品信息通过ID
    async getProductInfoByIdAsync({commit},id){
        // 从返回值中解构出数据
        const {data} = await getProductInfoById(id);
        // 提交
        commit("SAVE_PRODUCT_INFO",data);
    }
}
// 暴漏数据，导出模块
export default {
    namespaced:true,
    state,
    mutations,
    actions,
}