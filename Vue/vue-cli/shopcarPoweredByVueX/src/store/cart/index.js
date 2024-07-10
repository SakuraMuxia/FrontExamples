
// 数据状态
const state = {
    cartList:[]
}
// 计算属性
const getters = {
    // 计算总结
    sumPrice(state){
        return state.cartList.reduce(function(prev,item){
            prev += item.goodsPrice * item.buyNum;
            return prev;
        },0)
    }
}
// 操作数据状态
const mutations = {
    // 加入购物车
    JOIN_CART(state, payload){
        
        // 判断购物车中是否存在该商品
        const cart = state.cartList.find(item =>{
            return item.id === payload.id;
        });
        
        if (cart){
            cart.buyNum++;
        }else{
            state.cartList.push({
                ...payload,
                buyNum:1,
            })
        }
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