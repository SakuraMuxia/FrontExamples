// 数据状态
const state = {
    // []===>[{id:xx,goodsName:商品名字,goodsPrice:商品价格}]
    goodsList: []
}
// 计算属性
const getters = {

}
// 操作数据状态
const mutations = {
    // 添加数据
    ADD_GOODS(state,{goodsName,goodsPrice}){
        state.goodsList = [
            {
                id:Date.now(),
                goodsName,
                goodsPrice: goodsPrice/1,
                addTime:Date.now()
            },
            ...state.goodsList
        ]
    }
}
// 异步的方法
const actions = {

}
// 模块
const modules = {

}
// 暴漏数据
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
    modules
}