// 导入axios请求
import { sphRequest } from "@/request";

// 注册用户的接口： /api/user/passport/register  post
const postRegister = (data) =>  {
    return sphRequest.post(`/user/passport/register`,data);
}

// 发送验证码的接口： 获取验证码 /api/user/passport/sendCode/{phone} get
const getSendCode = (phone) => {
    return sphRequest.get(`/user/passport/sendCode/${phone}`);
}

// 登陆接口：/api/user/passport/login post
const postLogin = (body) => {
    return sphRequest.post('/user/passport/login',body)
}

// 获取用户信息：/api/user/passport/auth/getUserInfo  GET
const getUserInfo = () => {
    return sphRequest.get('/user/passport/auth/getUserInfo');
}

// 获取用户交易信息：
const getTradeList = () => {
    return sphRequest.get("/order/auth/trade");
}

// 退出登陆
const getLogout = () => {
    return sphRequest.get('/user/passport/logout');
}

// 获取用户的地址信息：获取用户地址信息 /user/userAddress/auth/findUserAddressList
const findUserAddressList = () => {
    return sphRequest.get('/user/userAddress/auth/findUserAddressList');
}

// 暴漏数据
export {
    postRegister,
    getSendCode,
    postLogin,
    getUserInfo,
    getLogout,
    findUserAddressList
}