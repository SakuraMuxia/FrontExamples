import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from '@/store/index';
// 导入过滤器对象
import filters from "@/filters";
Vue.config.productionTip = false
Vue.use(filters);


// 创建Vue实例
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')