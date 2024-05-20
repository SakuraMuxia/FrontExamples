import advV from '@/views/adv'
import toastr from 'toastr';
// 导入组件
import AdvTableComponent from '../components/AdvTable';
// 导入api函数
import {postAdv,getAdv} from '../api/adv';

// 创建变量 记录预览图元素
let preImgEle;
// 执行获取广告列表并渲染页面
const getAdvExec = async (no=1, size=4) => {
    // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
    const advTypeDes = {
        1: '轮播图广告',
        2: '轮播图底部广告',
        3: '热门回收广告',
        4: '优品精选广告'
    };
    // 获取搜索框中的数据
    const kw = document.querySelector('#keyword').value.trim();
    // 调用后端API获取数据
    const {data, pageNo, pageSum} = await getAdv(no, size, kw);
    // const {data} = await getAdv();
    console.log(data);
    console.log(pageNo);
    console.log(pageSum);

    
    // 将数据传入组件
    document.querySelector('#advTable').innerHTML = AdvTableComponent({
        advList:data,
        advTypeDes,
        pageNo,
        pageSum
    });
}

// 执行分页渲染的函数
const setPageExec = event => {
    // 判断是否是分页按钮
    if (event.target.classList.contains('page-link')) {
        getAdvExec(event.target.dataset.i);
    }
}

// 执行图片预览
const prevImgExec = function() {
    // 获取file对象
    const file = this.files[0];

    // 判断
    if (!file) {
        return;
    }

    // 实例化 FilerReader
    const reader = new FileReader()

    // 将文件读取成 base64 编码的形式  异步
    reader.readAsDataURL(file);

    // 监听读取完毕
    reader.onload = () => {
        // 将 base64编码的图片作为 src 属性的值
       preImgEle.src = reader.result;
       preImgEle.style.display = 'block';
    }
}
// 执行广告添加
const addAdvExec = async event => {
    // 阻止默认行为
    event.preventDefault();
    // 创建 FomrData 对象，以 form元素作为参数
    const fd = new FormData(document.addAdvForm);
    // 利用纯数组进行判断
    const fdArr = Array.from(fd);
    if (!fdArr.every(item => item[1])) {
        toastr.error('请将表单填写完整！');
        return;
    }
    if (fd.get('advPic').size === 0) {
        toastr.error('请选择要上传的图片！');
        return;
    }
    // 使用后端API添加广告
    const res = await postAdv(fd);
    console.log(res);
    
    // 模态框关闭
    $('#advModal').modal('hide');
    // 表单清空
    document.addAdvForm.reset();
    // 隐藏预览图
    preImgEle.style.display = 'none';
    // 清空搜索框
    document.querySelector('#keyword').value = '';
    // 更新列表
    getAdvExec();
}

export default (req, res) => {
    // 渲染页面
    res.render(advV());

    // 获取广告列表并渲染到页面
    getAdvExec();

    // 点击分页按钮 事件委托
    document.querySelector('#advTable').addEventListener('click', setPageExec);

    // 点击搜索按钮
    document.querySelector('#searchAdvBtn').addEventListener('click', () => {
        getAdvExec();
    });

    // 获取预览图元素
    preImgEle = document.querySelector('#preImg');

    // 给图片上传input监听change事件，实现图片实时预览
    document.querySelector('#advPic').addEventListener('change', prevImgExec);

    
    // 给表单监听提交事件
    document.addAdvForm.addEventListener('submit', addAdvExec);


}