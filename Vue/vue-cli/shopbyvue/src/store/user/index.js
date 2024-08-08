import { getSendCode, postRegister } from "@/api/user"

const state = {
    // 用户列表
    userList: []
}
const getters = {

}
const mutations = {

}

const actions = {
    // 发送注册用户的异步请求
    async postRegisterAsync(content,data){
        // 获取响应数据
        const resData = await postRegister(data);
        // 把响应数据返回
        console.log("resData", resData);
        return resData;
        
    },
    // 发送验证码的异步请求
    async getSendCodeAsync(content,phone){
        // 获取响应数据
        const result = await getSendCode(phone);
        // 把响应数据返回
        return result.data;
        
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
