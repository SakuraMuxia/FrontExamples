import VueRouter from "vue-router";

// 重写VueRouter对象中的方法
const enVueRouter = function(prop){
    const nativeFn = VueRouter.prototype[prop];
    // 重写push replace等方法
    VueRouter.prototype[prop] = function (location, onComplete, onAbort){
        return nativeFn.call(this, location, onComplete, () => { })
    }
}
export default enVueRouter;