import { getCartIsCheckedById, getCartList, postAddToCart, deleteCartListById, deleteCartListBatch, postBatchCheckCart } from "@/api/cart";

const state = {
    // 购物车列表
    cartList: []
}
const getters = {
    // 获取购物车商品勾选的数量和价格
    getCountResult({cartList}){
        let checkedNum = 0;
        let checkedPrice = 0;
        // console.log("cartList", cartList);
        cartList.forEach(item=>{
            if(item.isChecked ===1){
                checkedNum++;
                checkedPrice+=item.skuPrice*item.skuNum
            }
        })
        return {
            checkedNum,
            checkedPrice
        }
    },
    // 获取购物车商品的勾选状态 { cartList } 从state中解构出 cartList
    getCartIsChecked({ cartList }){
        // 判断购物车中的商品是否都已经勾选
        return cartList.every(v=>v.isChecked ===1);
    }
}
const mutations = {
    // 更新购物车的方法
    SAVE_CART_LIST(state, cartList) {
        state.cartList = cartList;
    },
    // 更新store中购物车选中状态信息
    UP_CART_LIST_ISCHECKED_BY_ID(state, { skuID, isChecked }){
        // 找到商品
        const info = state.cartList.find(v => v.skuId === skuID);
        // 如果商品存在,把isChecked状态传递给store
        if(info){
            info.isChecked = isChecked;
        } 
    },
    // 根据商品ID删除购物车中商品
    DELETE_CART_LIST_BY_ID(state, skuId) {
        state.cartList = state.cartList.filter(v => v.skuId !== skuId);
    },
    // 更新购物车商品的购买数量
    UP_CART_SKU_NUM(state, { skuId, num }){
        // 找到商品
        const info = state.cartList.find(v => v.skuId === skuId);
        
        // 如果商品找到
        if (info) {
            info.skuNum = num;
        } 
    }
}

const actions = {
    // 切换购物车商品的全选请求
    async postBatchCheckCartAsync({ getters, state, dispatch }){
        // isChecked:要切换的状态,如果商品全部勾选，则返回0，否则则返回1==>相当于取反
        const isChecked = getters.getCartIsChecked?0:1;
        // 把购物车商品中未勾选的商品勾选:
        // 先过滤出未勾选的商品，然后把未勾选的商品重新组成一个数组(由商品Id组成的数组)
        const skuIdList = state.cartList.filter(v => v.isChecked === (getters.getCartIsChecked ? 1 : 0)).map(v => v.skuId)
        // 调用接口 提交批量勾选请求
        await postBatchCheckCart(isChecked, skuIdList);
        // 调用接口 刷新购物车商品信息
        await dispatch("getCartListAsync");
    },
    // 批量删除购物车中商品
    async deleteCartListBatchAsync({ dispatch, state }){
        if (window.confirm("您确定要删除选中的数据吗")) {
            // 调用批量删除购物车商品的接口
            await deleteCartListBatch(state.cartList.filter(v => v.isChecked === 1).map(item => item.skuId))
            // 调用获取购物车的数据的接口，刷新页面
            await dispatch("getCartListAsync");
        }
    },
    // 删除购物车中选中的商品请求
    async deleteCartListByIdAsync({ dispatch, commit }, skuId){
        // 根据商品ID删除购物车信息
        await deleteCartListById(skuId);
        // 方案一：更新购物车列表
        // await dispatch("getCartListAsync");
        // 通过 mutations 更新store本地的数据
        commit("DELETE_CART_LIST_BY_ID", skuId);
    },
    // 获取购物车的请求
    async getCartListAsync({ commit }) {
        // 获取后端购物车信息,解构出data
        const {data} = await getCartList();
        // 使用commit提交 SAVE_CART_LIST
        commit("SAVE_CART_LIST", data[0] ? data[0].cartInfoList : []);
    },
    // 添加到购物车的请求
    async postAddToCartAsync(content, { skuId, skuNum }) {
        const res = await postAddToCart(skuId, skuNum);
        
    },
    // 获取购物车选中状态请求
    async getCartIsCheckedByIdAsync({ commit }, { skuID, isChecked }){
        // 调用接口
        const res = await getCartIsCheckedById(skuID, isChecked);
        if (res.code === 200) {
            // 重新获取购物车列表。
            commit("UP_CART_LIST_ISCHECKED_BY_ID", { skuID, isChecked });
        } else {
            alert("异常:" + res.message)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
