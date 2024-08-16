import Vue from 'vue';
import VueRouter from 'vue-router';
import enVueRouter from '@/utils/pushReWrite';
// 导入store对象
import store from '@/store';
// 导入getToken对象
import { getToken } from '@/utils/auth';

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Details from "@/pages/Details";
import AddCartSuccess from "@/pages/AddCartSuccess";
import Cart from "@/pages/Cart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";

Vue.use(VueRouter);
// 重写push,replace方法
enVueRouter("push");
enVueRouter("replace");

// 定义路由
const routes = [
    // 首页路由
    {
        path:'/',
        component:Home,
        name:"home",
        meta:{
            // 是否使用导航
            isTypeNav:true,
        }
    },
    // 登陆路由
    {
        path: '/login',
        component: Login,
        meta:{
            // 隐藏页脚中的列表信息
            isHideFooterList:true,
        }
    },
    // 注册路由
    {
        path: '/register',
        component: Register,
        meta: {
            // 隐藏页脚中的列表信息
            isHideFooterList: true,
        }
    },
    // 搜索路由
    {
        path: '/search',
        name:"search",
        component: Search,
        meta: {
            // 是否使用导航
            isTypeNav: true,
            isGoaddCartSuccess: true
        }
    },
    // 搜索详情路由
    {
        path: "/detail/:id.html",
        component: Details,
        name: "detail",
        meta: {
            // 是否使用导航
            isTypeNav: true,
            // 是否滑动到底部
            ScrollToHeader:true,
            // 是否可以进入加入购物车成功页面
            isGoaddCartSuccess: true
        }
    },
    // 成功加入购物车的路由
    {
        path: "/addCartSuccess",
        component: AddCartSuccess,
    },
    // 购物车路由
    {
        path: "/cart",
        component: Cart,
        meta: {
            // 是否使用导航
            isTypeNav: true,
            isAuth: true,
            
        }
    },
    // 交易结算路由
    {
        path: "/trade",
        component: Trade,
        meta: {
            isAuth: true,
        },
    },
    // 支付页面路由
    {
        path: "/pay/:orderId.html",
        component: Pay,
    },
    // 支付成功页面
    {
        path: "/paySuccess",
        component: PaySuccess,
    }
]

// 创建路由对象
const router = new VueRouter({
    mode:"history",
    routes,
    scrollBehavior(to, from) {
        if (to.meta.ScrollToHeader) {
            return {
                x: 0,// 横向
                y: 0// 纵向
            }
        }
    },
    
});
// 创建路由前守卫
router.beforeEach(async (to, from, next) => {
    // 判断个人信息是否存在:当存在token但个人信息数据不存在时，即刷新了界面
    if(getToken() && !store.state.user.userInfo){
        // 调用异步请求
        await store.dispatch("user/getUserInfoAsync");
    }
    // 判断路由是否需要登陆认证
    if(to.meta.isAuth){
        // 判断是否存在token
        if(getToken()){
            next();
        }else{
            next({
                // 跳转到登陆页面
                path:"/login",
                // 把目的地址拼接到query中
                query:{
                    cb:to.path,
                }
            });
        }
    }
    // 默认放行
    next();
})

// 导出
export default router;

