// 导入模板页
import adminV from '@/views/admin'
// 导入 toastr
import toastr from 'toastr';
import '../../node_modules/toastr/build/toastr.css';
// 导入 sweetalert2
import Swal from 'sweetalert2';
// 导入管理员列表表格的组件
import AdminTabelComponent from '../components/AdminTable';

// 导入发送请求的函数
import {postAdmin,getAdmin,deleteAdmin} from '../api/admin';

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
    postAdmin({
        adminName,
        passWord
    })
    .then( res => {
        toastr.success('管理员添加成功');
        // console.log('成功：',res);

        // 关闭模态框
        $('#addAdminModal').modal('hide');
        // 清空表单
        document.adminForm.reset();
        // 更新列表
        getAdminExec();
    })


}
// 获取管理员信息 并渲染页面
const getAdminExec = () => {
     // 向后端API请求
    getAdmin()
    .then(res => {
        // 将数据发送到管理员表格组件中 将组件设置到模板的指定位置
        // console.log(res.data);
        document.querySelector('#amdinListBox').innerHTML = AdminTabelComponent({adminList: res.data});
    })
}

// 执行管理员的删除
const deleteAdminExec = event => {
    // 判断目标元素是否是删除按钮
    if (event.target.classList.contains('btn-danger')) {
        // 使用插件 sweetalert2 弹出确认框
        Swal.fire({
            title: "确认删除?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "确定",
            cancelButtonText: '取消'
            }).then((result) => {
            if (result.isConfirmed) {
                deleteAdmin(event.target.dataset.id)
                .then(res => {
                    // 更新列表
                    getAdminExec();
                    // 弹框提示删除成功
                    Swal.fire({
                        title: "Deleted!",
                        text: "已删除!",
                        icon: "success"
                    });
                })
                
            }
        });

    }
}

export default (req, res) => {

    // 渲染模板内容
    res.render(adminV());

    // 获取管理员信息
    getAdminExec();

    // 给添加按钮监听click事件
    document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec);

    // 给管理员列表中的删除按钮监听单击事件 事件位置
    document.querySelector('#amdinListBox').addEventListener('click', deleteAdminExec);

}