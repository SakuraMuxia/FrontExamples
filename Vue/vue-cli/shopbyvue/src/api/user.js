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

// 暴漏数据
export {
    postRegister,
    getSendCode
}