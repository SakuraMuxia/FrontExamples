import { getTradeList, postSubmitOrder } from "@/api/order";

// 导入element中的Message对象
import { Message } from "element-ui";

const state = {
    // 交易信息
    tradeInfo:{
        detailArrayList: [
            
        ]
    }
}
const getters = {
    
}
const mutations = {
    // 保存交易数据
    SAVE_TRADE_INFO(state, payload) {
        state.tradeInfo = payload;
    }
}

const actions = {
    // 异步获取交易数据
    async getTradeListAsync({ commit }) {
        const {data} = await getTradeList();
        commit("SAVE_TRADE_INFO", data);
    },
    // 异步提交订单数据
    async postSubmitOrderAsync(content, { tradeNo, body }){
        const result = await postSubmitOrder(tradeNo, body)
        return result;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}