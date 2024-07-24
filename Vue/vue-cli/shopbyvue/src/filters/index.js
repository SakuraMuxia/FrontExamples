// 定义一个过滤器
const filters = {
    // 时间过滤器
    date(t){
        const timer = new Date(t);
        return timer.getFullYear() + "-" +
            (timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
            timer.getDate().toString().padStart(2, 0) + " " +
            timer.getHours().toString().padStart(2, 0) + ":" +
            timer.getMinutes().toString().padStart(2, 0) + ":" +
            timer.getSeconds().toString().padStart(2, 0);
    },
    // 金额过滤器
    currency(v, n = 2, type = "$") {
        return type + v.toFixed(n);
    },
    // 品牌过滤器
    trademark(value){
        // console.log(value.split(":"));
        return value.split(":")[1];
    },
    
    
}
// 暴漏一个函数
export default function(V){
    for(let key in filters){
        V.filter(key,filters[key]);
    }
}