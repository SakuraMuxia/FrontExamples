import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入模版
import Index from "@/views/Index";
import AddGoods from '@/views/AddGoods';
import GoodsList from '@/views/GoodsList';
import CartList from '@/views/CartList';
import My from '@/views/My';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Index,
        children:[
            {
                path: "/",
                component: AddGoods,
                meta:{
                    title:"添加商品界面"
                }
            },
            {
                path: "/goodsList",
                component: GoodsList,
                meta: {
                    title: "商品界面"
                }
            },
            {
                path: "/cartList",
                component: CartList,
                meta: {
                    title: "购物车界面",
                    isAuthor:true,
                }
            },
            {
                path: "/my",
                component: My,
                meta: {
                    title: "个人中心界面",
                    isAuthor: true
                }
            },
        ]
    },
    // 登陆页面
    {
        path: "/login",
        component: Login,
        meta:{
            title:"登陆界面",
        }
    },
]
// 定义一个router对象
const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active"
})
// 定义一个 全局前置钩子
router.beforeEach((to,from,next)=>{
    // 判断页面是否需要登陆
    if(to.meta.isAuthor){
        // 如果存在token，则放行
        if(localStorage.getItem("token")){
            next();
        }else{
            // 否则，跳转到 /login
            next({
                path:'/login',
                query:{
                    // 记录跳转的路由,作为查询字符串
                    cb:to.path
                }
            });
        }
    } else next()
})
// 定义一个 全局后置钩子
router.afterEach(function(to){
    document.title = to.meta.title;
})
export default router
