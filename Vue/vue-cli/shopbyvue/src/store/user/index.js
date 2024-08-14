import { getSendCode, postRegister, postLogin, getUserInfo, findUserAddressList } from "@/api/user"

// 导入element中的Message对象
import { Message } from "element-ui";
// 导入路由对象
import router from "@/router";
import { saveToken } from "@/utils/auth";
// 导入清空token工具类
import { rmToken } from "@/utils/auth"

const state = {
    // 用户列表
    userList: [],
    // 用户信息
    userInfo:null,
    // 用户地址信息
    addressList:[],

}
const getters = {
    // 用户地址信息计算属性
    addressDefault(state){
        // 返回地址信息中默认是1的元素
        return state.addressList.find(v => v.isDefault === '1') || {}
    }
}
const mutations = {
    // 根据ID更改默认地址
    CHANGE_ADDRESS_DEFAULT_BY_ID(state, id){
        // 先将之前选中的移除,将当前选中的增加上样式
        state.addressList = state.addressList.map(
            item=>{
                if (item.id === id) item.isDefault = '1';
                else item.isDefault = '0';
                return item;
            }
        )
    },
    
    // 保存用户地址信息
    SAVE_ADDRESS_LIST(state,payload){
        state.addressList = payload;
    },

    // 把个人用户信息保存到store中
    SAVE_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },

    // 退出登陆清空store数据
    OUT_LOG(){
        // 把userInfo数据清空
        state.userInfo = null;
        // 调用清除token工具类
        rmToken();
        // 路由跳转到登陆界面
        router.push("/login");

    }
}

const actions = {
    
    // 发送用户地址异步信息请求 账号密码：13700000000 111111
    async findUserAddressListAsync({commit}){
        const {data} = await findUserAddressList();
        commit("SAVE_ADDRESS_LIST",data);
    },
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
            // 跳转至未登录前的页面
            // 判断是否存在cb
            const { cb } = router.history.current.query;
            // 如果存在cb跳转cb，否则跳转到首页
            if (cb){
                router.push(cb);
            }else{
                router.push("/");
            }
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
