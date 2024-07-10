import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
// 导入模块
import goods from '@/store/goods/index';
import cart from '@/store/cart/index';
import user from '@/store/user/index';

Vue.use(Vuex)

// 定义store对象
const store = new Vuex.Store({
    state: {
        num:1,
        message:"",
    },
    getters: {

    },
    mutations: {
        // 数量加1
        ADD_Number(state){
            state.num++;
        },
        UP_Message(state, message){
            state.message = message;
        }
    },
    actions: {

    },
    modules: {
        // goods模块
        goods,
        // 购物车模块
        cart,
        // 用户模块
        user
    },
    plugins:[
        createPersistedState({
            key:"YuluoChenxiao",
            paths:["goods","cart","user"]
        })
    ]
})

// 暴漏
export default store;
