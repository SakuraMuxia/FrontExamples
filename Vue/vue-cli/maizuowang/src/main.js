import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import loading from "@/components/Loading.vue";

Vue.use(ElementUI);
Vue.component("loading",loading);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
