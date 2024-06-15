import Vue from 'vue'
import App from './App.vue'
import filters from '@/filters/yousa';
import axios from '@/request/kano';
Vue.config.productionTip = false;


new Vue({
    render: h => h(App),
    beforeCreate(){
        Vue.use(filters);
        Vue.use(axios);
    }
}).$mount('#app')

