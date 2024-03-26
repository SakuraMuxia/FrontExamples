// 获取元素
var box01 = document.querySelector('#box01');
var box02 = document.querySelector('#box02');

// 监听事件
box01.onmousemove = moveFunc;
box02.onmousemove = throttle(moveFunc, 600);


function moveFunc(ev) {
    console.log('鼠标移动', Date.now());
    this.innerHTML = ev.offsetX + ',' + ev.offsetY;
}


// 节流函数
function throttle(method, delay) {
    var prev = Date.now();  // 记录上一次事件执行事件
    return function() {
        var now = Date.now();   // 此时此刻的时间
        // 比上一次执行大于时间间隔才能执行
        if (now - prev > delay) {
            method.apply(this, arguments);
            prev = now;    // 重新记录执行时间
        }
    }
}