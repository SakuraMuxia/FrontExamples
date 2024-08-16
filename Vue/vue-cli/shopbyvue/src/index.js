import Vue from 'vue'
import App from './App.vue'

// 导入样式
import "@/assets/css/reset.css";
// 导入路由
import router from '@/router/index';
import store from '@/store';
// 导入mock
import "@/mock";
// 导入filters
import filters from "@/filters"
// 导入全局组件
import Pagination from "@/components/Pagination";
// 导入iconfont样式
import "@/assets/iconfont/iconfont.css";

// 导入element-ui
import ElementUI from 'element-ui';
import { Button, Message, MessageBox, Row } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入图片懒加载
import VueLazyLoad from "vue-lazyload";
import loading from "@/assets/images/loading.gif"
// 导入自定义方法
import '@/utils/gotoSearch';
// 导入表单验证
import '@/utils/validate'
// 忽略vue提示
Vue.use(ElementUI);
Vue.config.productionTip = false;
// 图片懒加载
Vue.use(VueLazyLoad, {
    // 图片未加载前给予呈现的图片
    loading
})
Vue.use(filters);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

new Vue({
    store,
    router,
    beforeCreate() {
        // 设置事件总线
        Vue.prototype.$bus = this;
        // 挂载全局组件
        Vue.component("Pagination", Pagination);
    },
    render: h => h(App),
}).$mount('#app')