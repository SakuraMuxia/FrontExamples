import axios from "axios";
axios.defaults.baseURL = "https://api.github.com";
axios.interceptors.response.use(res => {
    console.log(res.data.items);
    return res.data.items;
});
export default function (Vue) {
    Vue.prototype.$axios = axios;
}