import { getTodaySell } from "@/api/todaysell";

const state = {
    // 今日推荐
    topTodayList: [],
};
const mutations = {
    SAVE_TOP_TODAY_LIST(state, topTodayList) {
        state.topTodayList = topTodayList;
    }
};
const actions = {
    async getTodaySellAsync({ commit }) {
        const { data } = await getTodaySell();
        commit("SAVE_TOP_TODAY_LIST", data);
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}