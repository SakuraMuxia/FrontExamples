
const filters = {
    date(t) {
        const timer = new Date(t);
        return timer.getFullYear() + "-" +
            (timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
            timer.getDate().toString().padStart(2, 0) + " " +
            timer.getHours().toString().padStart(2, 0) + ":" +
            timer.getMinutes().toString().padStart(2, 0) + ":" +
            timer.getSeconds().toString().padStart(2, 0);
    },
    currency(v, n = 2, type = "$") {
        return type + v.toFixed(n);
    }
}
// 暴漏一个函数
export default function(Vue){
    for(let key in filters){
        Vue.filter(key,filters[key]);
    }
}