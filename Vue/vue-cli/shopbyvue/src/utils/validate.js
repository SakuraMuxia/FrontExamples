import Vue from 'vue';

import VeeValidate, { Validator } from "vee-validate"
import { phoneReg, pwdReg } from "@/utils/reg";
Vue.use(VeeValidate);

// 重写规则：
Validator.extend("required", {
    // 该函数的返回值是一个布尔，为true说明符合规则，false不符合规则
    validate: value => value.trim().length > 0,
    // 当规则为false时，返回的值即是错误显示信息
    // file指向的是input标签中name设置的属性值
    getMessage(file) {
        return file + "不允许为空！"
    }
});

// 验证手机号：
Validator.extend("phone_rule", {
    // 该函数的返回值是一个布尔，为true说明符合规则，false不符合规则
    validate: value => phoneReg.test(value),
    // 当规则为false时，返回的值即是错误显示信息
    // file指向的是input标签中name设置的属性值
    getMessage: () => "请输入正确的手机号！"
});

// 验证密码：
Validator.extend("pwd_rule", {
    // 该函数的返回值是一个布尔，为true说明符合规则，false不符合规则
    validate: value => pwdReg.test(value),
    // 当规则为false时，返回的值即是错误显示信息
    // file指向的是input标签中name设置的属性值
    getMessage: () => "请输入6至21位密码！"
});