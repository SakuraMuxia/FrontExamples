// 定义默认请求配置项
const defaults = {
    timeout: 0,
    method:'get'
};


/**
 * 发送 ajax 请求
 * @param {object} config 请求配置项
 * @returns {Promise} 
 */
function dispatchRequest(config) {
    return new Promise((resolve, reject) => {
        // 创建 xhr 对象
        const xhr = new XMLHttpRequest();
        // 初始化
        xhr.open(config.method, config.url);
        // 发送
        xhr.send();

        // 监听成功响应
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve('Success');
            } else {
                reject('Error');
            }
        }

        // 监听失败响应
        xhr.onerror = () => {
            reject('Error');
        }
        
    })
}
// 定义核心类
class Axios{
    // 构造器方法
    constructor(instanceConfig) {
        this.defaults = instanceConfig;
    }
    // 发送请求的方法
    request(configOrUrl={},config={}) {
        // 判断第一个参数是否是 url, config最后是一个对象
        if (typeof configOrUrl === 'string') {config.url = configOrUrl}
        else{config = configOrUrl;}
        // 将传入的请求配置对象和全局请求配置对象合并
        config = Object.assign({}, this.defaults, config);
        // 设置默认请求方式是 GET
        config.method = (config.method || this.defaults.method || 'get').toUpperCase();
        // 调用函数发送请求
        return dispatchRequest.call(this, config);
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

// 以模块的形式对外暴露
export default axios;

