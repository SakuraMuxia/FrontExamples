import { getTradeList } from "@/api/order";

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
    SAVE_TRADE_INFO(state, payload) {
        state.tradeInfo = payload;
    }
}

const actions = {
    async getTradeListAsync({ commit }) {
        const {data} = await getTradeList();
        commit("SAVE_TRADE_INFO", data);
        
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}