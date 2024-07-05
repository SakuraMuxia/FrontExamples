import Vue from "vue";
import Vuex from 'vuex';
import axios from "@/request/kano"
// 挂载到Vue实例上
Vue.use(Vuex);

// 定义数据状态
const state = {
    items:[],
}

// 定义matations修改数据状态 同步更新状态方法
const mutations = {
    UPDATE_ITEMS(state,items){
        state.items = items;
    }
}

// 定义getters
const getters = {

}

// 异步行为
const actions = {
    getItems:function({commit},payload){
        
        // 获取数据
        axios.get("/search/repositories",{
            params: {
                q: "r",
                sort: "stars"
            }
        })
        .then(res =>{
            console.log(payload);
            // 更新数据状态
            commit("UPDATE_ITEMS", res.data.items);
        });
    }
}
// 定义store对象
const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});

// 暴漏出来
export default store;