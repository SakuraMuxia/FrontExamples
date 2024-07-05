// 数据状态
const state = {
    token:localStorage.token || null,  
}
// 计算属性
const getters = {

}
// 操作数据状态
const mutations = {
    SET_TOKEN(state,token){
        state.token = localStorage.token = token;
    }
}
// 异步的方法
const actions = {

}
// 模块
const modules = {

}
// 暴漏数据
export default {
    state,
    getters,
    mutations,
    actions,
    modules
}