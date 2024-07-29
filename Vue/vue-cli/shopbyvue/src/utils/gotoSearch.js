// 导入vueRouter
import VueRouter from "vue-router";

// 接收参数对象
VueRouter.prototype.gotoSearch = function (query) {
    // console.log(this)
    this.push({
        path: "/search",
        query: {
            // 拼接之前的 query
            ...this.history.current.query,
            // 默认pageNo为1
            pageNo: 1,
            // 拼接新的 query
            ...query,
        }
    })
}
