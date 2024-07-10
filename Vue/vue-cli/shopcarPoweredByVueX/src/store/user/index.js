import axios from 'axios';
// 数据状态
const state = {
    token:localStorage.token || null,  
    userInfo:{}
}
// 计算属性
const getters = {

}
// 操作数据状态
const mutations = {
    // 设置token的方法
    SET_TOKEN(state,token){
        state.token = localStorage.token = token;
    },
    // 设置用户信息的方法
    SET_INFO(state,userInfo){
        state.userInfo = userInfo;
    },
    // 退出登陆
    OUT_LOGIN(state){
        // 清除浏览器localStorage
        localStorage.clear();
        // 清除state的token信息
        state.token = null;
        // 清空state用户信息
        state.userInfo = {};
    }
}
// 异步的方法
const actions = {
    // 登陆
    async login({ commit }, username) {
        // 发送axios请求
        const { data } = await axios.get("http://127.0.0.1:8001/user/", {
            params: {
                username: username,
            }
        })
        if (data.length === 0) {
            alert("登陆失败! *~*");
            // 返回一个无状态的promise对象
            return new Promise(() => { });
        }
        // 设置响应信息
        if (data[0].code / 1 === 200) {
            // alert("登陆成功! ^_^");
            commit("SET_TOKEN", data[0].data);
        }

    },
    // 获取信息
    async getInfo({state,commit}){
        const { data } = await axios.get("http://127.0.0.1:8001/info/",{
            headers: {
                token: state.token
            }
        })
        commit("SET_INFO",data[0]);
    },
    // 退出登陆
    async postLogout({state,commit}){
        const { data } = await axios.get("http://127.0.0.1:8001/logout/",{
            headers: {
                token: state.token
            }
        });
        console.log("退出登陆成功!!!",data);
        commit("OUT_LOGIN");
    }
}
// 模块
const modules = {

}
// 暴漏数据
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules
}