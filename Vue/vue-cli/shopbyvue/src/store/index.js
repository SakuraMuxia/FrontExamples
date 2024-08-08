import Vue from 'vue';
import Vuex from 'vuex';
// 导入product模块
import product from "@/store/product/index.js";
import adv from '@/store/adv/index';
import todaysell from './todaysell';
import cart from '@/store/cart/index';
import user from './user';

// 挂载
Vue.use(Vuex);
// 定义store对象
const store = new Vuex.Store({
    modules:{
        product,
        adv,
        todaysell,
        cart,
        user
    }
});
// 导出store对象
export default store;