import toastr from 'toastr';
// 导入模板
import loginV from  '@/views/login';
// 导入api函数
import {postLogin} from '../api/login';

// 执行登录的函数
const postLoginExec = event => {
    // 阻止默认行为
    event.preventDefault();

    // 获取表单数据
    const adminName = document.loginForm.adminName.value.trim();
    const passWord = document.loginForm.passWord.value.trim();

    // 账号不能为空
    if (adminName.length === 0) {
        toastr.error('请填写管理员账号！');
        return;
    }

    // 密码不能为空
    if (passWord.length === 0) {
        toastr.error('密码不能为空！');
        return;
    }

    // 使用后端API 发送数据执行登录
    postLogin({
        adminName,
        passWord
    })
    .then(res => {
        // 输出后端发来的token
        // console.log(res.token);
        // 将用户信息和用户名记录到 localStorage
        localStorage.setItem('adminName', adminName);
        localStorage.setItem('token', res.token);

        // 跳转管理员列表页
        router.go('/index/admin');
    });
}

export default (req, res) => {
    // 渲染模板
    res.render(loginV());

    // 给表单监听提交事件
    document.loginForm.addEventListener('submit', postLoginExec)

}