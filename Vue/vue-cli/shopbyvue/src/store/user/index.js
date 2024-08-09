import { getSendCode, postRegister, postLogin,getUserInfo } from "@/api/user"
// 导入element中的Message对象
import { Message } from "element-ui";
// 导入路由对象
import router from "@/router";
import { saveToken } from "@/utils/auth";

const state = {
    // 用户列表
    userList: [],
    // 用户信息
    userInfo:null,
}
const getters = {

}
const mutations = {
    // 把个人用户信息保存到store中
    SAVE_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    }
}

const actions = {
    // 发送注册用户的异步请求
    async postRegisterAsync(content,data){
        // 获取响应数据
        const resData = await postRegister(data);
        // 把响应数据返回
        return resData;
        
    },
    // 发送验证码的异步请求
    async getSendCodeAsync(content,phone){
        // 获取响应数据
        const result = await getSendCode(phone);
        // 把响应数据返回
        return result.data;
        
    },
    // 发送登陆的异步请求
    async postLoginAsync(content,body){
        // 调用登陆api,解构出响应的code和数据
        const { code, data } = await postLogin(body);
        // 判断响应结果
        if (code === 200){
            Message.success("恭喜您，登陆成功！");
            // 存储token到localstorage
            saveToken(data.token);
            // 跳转至首页
            router.push("/");
        }else{
            Message.error("账号或密码错误！");
        }
    },
    // 发送获取个人信息的异步请求
    async getUserInfoAsync({commit}){
        const result = await getUserInfo();
        commit("SAVE_USER_INFO", result.data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
