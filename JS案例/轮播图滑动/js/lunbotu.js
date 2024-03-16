(function(){
    //获取元素
    var playBox = document.querySelector('#playBox');
    var imgWrapper = playBox.querySelector('.images'); //获取图片的包裹元素
    var btnItems = playBox.querySelectorAll('.btns li');    //所有按钮的集合
    var prevArrow = playBox.querySelector('.arrow-prev');    //左箭头
    var nextArrow = playBox.querySelector('.arrow-next');    //右箭头

    //复制最后一张图片添加到最前面
    imgWrapper.insertBefore(imgWrapper.lastElementChild.cloneNode(true),imgWrapper.firstElementChild);
    //复制第一张图片添加到最后
    imgWrapper.appendChild(imgWrapper.children[1].cloneNode(true));

    // 再次获取图片的集合
    var imgItems = playBox.querySelectorAll('.images li');

    // 定义变量 变量记录当前显示的图片和当前选中的按钮的索引
    var index = 0,imgIndex = 1;
    // 定义变量 设置定时器事件间隔
    var duration = 3000;
    // 定义变量 记录单个图片的宽度
    var imgWidth = imgItems[0].offsetWidth;

    //设置图片的初始位置
    imgWrapper.style.left = -imgWidth + 'px';

    //遍历 给每个按钮监听 click 事件
    btnItems.forEach(function(btnItem,btnindex){
        btnItem.onclick = function(){
            //修改index的值为 当前所点击的按钮的索引
            index = btnindex;
            imgIndex = btnindex + 1;
            //调用函数 控制图片显示和按钮选中
            setActive();
        };
    });

    // 左箭头按钮 监听click事件
    prevArrow.onclick = prev;
    //右箭头按钮 监听click事件
    nextArrow.onclick = next;

    //设置定时器 返回定时器标记
    var intervalId = setInterval(next,duration);

    //监听鼠标进入轮播图区域
    playBox.onmouseenter = function(){
        //停止定时器
        clearInterval(intervalId);
    };

    //监听鼠标离开轮播图区域
    playBox.onmouseleave = function(){
        //再次设置定时器，返回定时器标志
        intervalId = setInterval(next,duration);
    };

    // 监听离开窗口和再次回调本窗口的事件
    document.onvisibilitychange = function() {
        if (document.hidden) {
            // 正在离开本窗口 停止定制器
            clearInterval(intervalId);
        } else {
            // 再次回到本窗口 再次开启定时器
            intervalId = setInterval(next, duration);
        }
    }

    //定义函数 切换到上一张和上一个按钮
    function prev(){
        // 索引减一
        index --;
        imgIndex --;
        //判断不能超出有效范围
        if (index <0){
            index = btnItems.length-1;
        };
        if (imgIndex < 0){
            imgIndex = imgItems.length - 3;
            //瞬间切换图片 切换成真正的第一张图片
            imgWrapper.style.transition = 'none';
            imgWrapper.style.left = -(imgItems.length-2) * imgWidth + 'px';
        }
        //调用函数 控制图片和按钮选中*****
        setTimeout(setActive);
    };


    //定义按钮 切换到下一张和下一个按钮
    function next(){
        // 索引加一
        index ++;
        imgIndex ++;
        //判断不能超出有效范围
        if (index > btnItems.length-1){
            index = 0;
        };
        // 判断不能超出有效范围（图片索引）
        if (imgIndex > imgItems.length -1){
            imgIndex = 2;
            //瞬间切换图片 切换成真正的第一张图片
            imgWrapper.style.transition = 'none';
            imgWrapper.style.left = -imgWidth + 'px';
        }
        //调用函数 控制图片和按钮选中
        setTimeout(setActive);
    };

    //定义函数 显示当前图片并选中当前的按钮
    function setActive(){
        // 把所有的按钮取消选中，去掉active类名，把所有的图片隐藏，去掉active类名
        btnItems.forEach(function(btnItem,index){
            btnItem.classList.remove('active');
        });
        // 当前点击按钮选中，添加active类名
        btnItems[index].classList.add('active');
        // 当前点击按钮对应的图片显示 修改图片包裹的位置
        imgWrapper.style.transition = 'left 600ms';
        imgWrapper.style.left = -imgWidth * imgIndex + 'px';
    };
})();
