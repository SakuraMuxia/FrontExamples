import Vue from 'vue';
import App from './App.vue';

// 导入过滤器对象
Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
    render: h => h(App),
}).$mount('#app')