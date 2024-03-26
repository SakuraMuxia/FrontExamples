
(function(){

    // 原始的样式
    /*
    var btn = document.querySelector('#btn');
    // 定义定时器标记
    var timeId = null;
    // 监听点击事件
    btn.onclick = function() {
        // 先清空上一次定时器
        clearTimeout(timeId);
        // 开启新的定时器
        timeId = setTimeout(function() {
            console.log('click 触发了，', Date.now());
        }, 1000);
    };
    */


//高阶函数的样式
// 获取元素
    var inputBox01 = document.querySelector('#input01');
    var inputBox02 = document.querySelector('#input02');
    // 监听事件
    inputBox01.oninput = changeInput;
    // 监听事件 debounce 生产一个具有防抖功能的新函数
    inputBox02.oninput = debounce(changeInput, 400);

    
    // 定义事件的回调函数 
    function changeInput(ev) {
        console.log('向后端请求搜索数据...', this.value, ev);
    };


    /*
        1. 两个参数  没有防抖功能的函数，时间间隔
        2. 返回值是函数
        3. 返回的函数中调用 method， 使用apply，为了设置 method 中的this是监听事件的元素
        4. 保证 method 中能够获取到事件对象， 通过 apply 传递进去
    
    */
    // 防抖函数
    function debounce(method, delay) {
        var timeId = null;
        return function() {
            //return这里的函数是事件调用地方，在这里才可以拿到事件的对象。
            var that = this;
            //arguments为获取method函数的变量伪数组，正好内置函数apply(this,[])，第二个参数是数组。
            var args = arguments;
            clearTimeout(timeId);
            timeId = setTimeout(function() {
                //这里不能直接写this，argument，因为这里是定时器对象的回调函数。
                method.apply(that, args);
            }, delay);
        };
    }
})();