import {getFocusList} from '@/api/adv';

const state = {
    // 首页轮播图信息
    focusList: []
};

const mutations = {
    SAVE_FOCUS_LIST(state, focusList) {
        state.focusList = focusList;
    }
};

const actions = {
    async getFocusListAsync({ commit }) {
        const { data } = await getFocusList();
        commit("SAVE_FOCUS_LIST", data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
