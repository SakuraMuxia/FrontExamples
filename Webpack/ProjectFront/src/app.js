// 导入
import SMERouter from 'sme-router';

// 导入路由配置
import routes from './routes';

// 导入less
import './assets/less/app.less'

// 创建实例
// 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
// 可以改为 history 模式，特点  http://adv.manage.fuming.site/index/advlist

const router = new SMERouter('app',"html5");

// 如果没有登录 跳转到登录页
if (!localStorage.getItem('adminName')) {
    router.go('/login');
}


// 遍历路由配置 设置路由
routes.forEach(routeItem => {
    router.route(routeItem.path,routeItem.element)
})

// 暴漏router对象
window.router = router;
