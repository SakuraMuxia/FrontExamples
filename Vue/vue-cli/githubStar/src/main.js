import Vue from 'vue';
import store from "@/store/index";
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    // 把store属性添加到vue实例中
    store,
    render: h => h(App),
}).$mount('#app')

