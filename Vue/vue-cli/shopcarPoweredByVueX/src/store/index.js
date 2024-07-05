import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import goods from '@/store/goods/index';
import cart from '@/store/cart/index';
import user from '@/store/user/index';

Vue.use(Vuex)

// 定义store对象
const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

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
    }
})

// 暴漏
export default store;
