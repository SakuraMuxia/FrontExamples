(window => {
    // 定义默认请求配置项
    const defaults = {
        timeout: 0
    };

    // 定义核心类
    class Axios{
        // 构造器方法
        constructor(instanceConfig) {
            this.defaults = instanceConfig;
        }
        // 发送请求的方法
        request() {
            console.log('request');
        }
    }
    // bind方法：改变fn函数this的指向（this指向thisArg对象），返回一个函数
    function bind(fn, thisArg) {
        return function wrap() {
            // fn 就是 Axios.prototype.request
            // argments 是伪数组，成员是传递给 axios 函数的参数
            // 就是在调用 Axios.prototype.request， 并设置里面的this是Axios类的一个实例
            return fn.apply(thisArg, arguments);
        }
    }
    /**
     * 创建 axios 函数， axios函数本质不是 Axios 的实例
     * @param {Object} defaultConfig The default config for the instance
     * @returns {Function} 调用该函数就是调用Axios.prototype.request()
     */
    function createInstance(defaultConfig) {
        // 实例化核心类型 得到实例
        const context = new Axios(defaultConfig);
        // 创建 axios 函数
        const instance = bind(Axios.prototype.request, context);
        // 返回
        return instance;
    }
    // 创建 axios
    const axios = createInstance(defaults);
    
    // 将 axios 暴露到全局
    window.axios = axios;
})(window||global)