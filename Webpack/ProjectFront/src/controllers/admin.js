// 导入模板页
import adminV from '@/views/admin'
// 导入 toastr
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';

// 导入请求实例
import advServer from '@/request/advserver.js';

// 执行添加管理员账号
const addAdminExec = () => {
    // 获取表单数据 form表单特有 document 方法 可以使用这种方法 document.[name]
    // 直接获得表单中的value值
    const adminName = document.adminForm.adminName.value.trim();
    const passWord = document.adminForm.passWord.value.trim();
    const rePassWord = document.adminForm.rePassWord.value.trim();

    // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
    if (adminName.search(/^[a-zA-Z]+$/) === -1) {
        toastr.error('管理员账号只能由英文字母组成！');
        return;
    }

    // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
    if (passWord.search(/^\w{6,18}$/) === -1) {
        toastr.error('密码必须由6到18位数字、字母、下划线组成');
        return;
    }

    // 确认密码
    if (passWord !== rePassWord) {
        toastr.error('两次密码不一致');
        return;
    }
    // 使用 axios 发送请求
    advServer
    .post('/admin', {
        adminName,
        passWord
    })
    .then( res => {
        toastr.success('管理员添加成功');
        console.log('成功：',res);
    })
    // .catch (err => {
    //     console.log('请示失败', err);
    // })

}
export default (req, res) => {

    // 渲染模板内容
    res.render(adminV());

    // 给添加按钮监听click事件
    document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
}