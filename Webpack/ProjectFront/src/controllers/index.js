// 导入模板
import indexV from  '@/views/index';


// 导入组件
import HeaderComponent from '@/components/Header'; 
import SidebarComponent from '@/components/Sidebar'; 
import FooterComponent from '@/components/Footer'; 
import ContentComponent from '@/components/Content'; 

// indexV 是一个ejs-loader 包做处理的函数 ，调用indexV的返回值 是模版中的内容,indexV(data)
// HeaderComponent 同样也是一个函数 调用的返回值 是模版中的内容

// 导入路由配置模块，谁用谁导入
import routes from '@/routes';

// 这里使用 req.url 方法得到路由，使用结构赋值简写为{url}
export default ({url}, res, next) => {
    // res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
    // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
    next(indexV({
        // 页头组件
        Header:HeaderComponent(),
        // 侧边栏组件
        Sidebar: SidebarComponent({
            // url:req.url
            url,
            routes
        }),
        // 页脚组件
        Footer: FooterComponent(),
        // 主要内容组件
        Content: ContentComponent({
            // 显示标题
            title: routes.find(item => { return item.path===url} ).title,
            // 把二级路由放在 组件中
            subRouteContent: res.subRoute()
        }),
    }));

    // 点击退出登录按钮
    document.querySelector('#logoutBtn').addEventListener('click', () => {
        // 清空 localStorage
        localStorage.clear();
        // 跳转到登录页面
        router.go('/login');
    })
}