import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ZeroGeneration:5,
        FirstGeneration:4,
        SecondGeneration:5,
        ThirdGeneration:4,
        FourthGeneration:5,
    },
    getters: {
        // 计算合计数目
        getSum(state){
            return state.FirstGeneration+state.SecondGeneration+state.ThirdGeneration+state.FourthGeneration+state.ZeroGeneration;
        }
    },
    mutations: {
        CHANGE_ZERO(state,payload){
            state.ZeroGeneration += payload;
        },
        CHANGE_FIRST(state, payload) {
            state.FirstGeneration += payload.num;
        },
        CHANGE_THIRD(state,payload){
            state.ThirdGeneration += payload.num;
        }
    },
    actions: {
    },
    modules: {
    }
})
