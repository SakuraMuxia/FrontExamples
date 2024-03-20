
// 放大镜
(function(){
    //获取相关元素
    var zoomBox = document.querySelector('#zoomBox');
    var smallImageBox = zoomBox.querySelector('.small-image');
    var largeImageBox = zoomBox.querySelector('.large-image');
    var maskBox = zoomBox.querySelector('.mask-box');


    //监听鼠标进入小图区域的事件
    smallImageBox.onmouseenter = function(){
        //萌图显示
        maskBox.style.display = 'block';
        //大图显示
        largeImageBox.style.display = 'block';
    };

    //监听鼠标在小图区域移动事件
    smallImageBox.onmousemove = function(event){
        //获取鼠标在小图区域的位置 鼠标在视口上的位置 - 小图元素在视口上的位置
        var left = event.clientX - smallImageBox.getBoundingClientRect().left;
        var top = event.clientY - smallImageBox.getBoundingClientRect().top;
        // 根据鼠标在小图区域的位置，计算蒙层的位置 减去蒙层尺寸的一半
        left -= maskBox.offsetWidth / 2;
        top -= maskBox.offsetHeight / 2;
        // 限制蒙层的位置
        if (left < 0) {
            left = 0;
        } else if (left > smallImageBox.clientWidth - maskBox.offsetWidth) {
            left = smallImageBox.clientWidth - maskBox.offsetWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (top > smallImageBox.clientHeight - maskBox.offsetHeight) {
            top = smallImageBox.clientHeight - maskBox.offsetHeight;
        }
        // 调整蒙层的位置
        maskBox.style.left = left + 'px';
        maskBox.style.top = top + 'px';
        // 调整大图的位置
        largeImageBox.scrollLeft = left * 2;
        largeImageBox.scrollTop = top * 2;




    };
    // 监听鼠标离开小图区域的事件
    smallImageBox.onmouseleave = function() {
        // 蒙层隐藏
        maskBox.style.display = 'none';
        // 大图隐藏
        largeImageBox.style.display = 'none';
    };
})();

// 商品预览缩略图
(function(){
    var prevBtn = document.querySelector('#thumbBox .thumb-prev');
    var nextBtn = document.querySelector('#thumbBox .thumb-next');
    var thumbWrapper = document.querySelector('#thumbBox .thumb-wrapper');   // 缩略图的包裹元素
    var smallImage = document.querySelector ('#zoomBox .small-image img');  // 小图元素
    var largeImage = document.querySelector('#zoomBox .large-image img');  // 大图元素
    // 根据数据 创建缩略图元素，引入后goodData就是一个全局变量 可以直接使用
    goodData.imgsrc.forEach(function(imgItem,index){
        // 创建 img 元素,并设置src
        var imgBox = new Image();
        imgBox.src = imgItem.s;
        // 自定义属性 给img元素添加 "data-index" 属性记录下来 并把索引添加进去
        imgBox.dataset.index = index;
        // 将 img 元素添加到缩略图包裹元素中
        thumbWrapper.appendChild(imgBox);
        // 可以把 添加每个img元素的事件监听 放在这里
        imgBox.onclick = function(){
            console.log(imgItem.s);
        };
    });
    // 计算单个图片所占的位置  自己的宽度+右边距
    var imgItemWidth = thumbWrapper.firstElementChild.offsetWidth +  parseInt(getStyle(thumbWrapper.firstElementChild, 'marginRight'));

    // 记录上一次事件触发的世间
    prevBtn.time = 0;
    // 监听点击上一个的箭头按钮
    prevBtn.onclick = function(event){
        // 距离上一次事件的触发超过 400ms 才能再次触发
        if (event.timeStamp - prevBtn.time <= 400) {
            console.log('ok');
            return;
        }
        // 事件触发之后 更新触发时间
        prevBtn.time = event.timeStamp;

        // 根据缩略图包裹元素当前的位置 计算目标位置
        var left = thumbWrapper.offsetLeft + imgItemWidth*2;
        // 判断有效范围内
        if (left > 0) {
            left = 0;
        }
        // 设置缩略图包裹元素位置
        thumbWrapper.style.left = left + 'px';
    };

    // 记录上一次触发的时间
    nextBtn.time = 0;
    // 点击下一个的箭头按钮
    nextBtn.onclick = function(event) {
        // 距离上一次事件的触发超过 400ms 才能再次触发 == 事件节流 
        // 解决按钮点击快 比 过渡时间短的问题
        if (event.timeStamp - nextBtn.time <= 400) {
            return;
        }

        // 事件触发之后 更新触发时间
        nextBtn.time = event.timeStamp;
    
        // 根据缩略图包裹元素当前的位置 计算目标位置 thumbWrapper.offsetLeft 初始值为0
        var left = thumbWrapper.offsetLeft - imgItemWidth*2;
        // 判断有效位置 用包裹图片的总宽度 - 内容显示的总宽度
        // - (thumbWrapper.offsetWidth - thumbWrapper.parentElement.clientWidth) 
        // 这里会因为内容显示的总宽度不够5张图片的显示 造成遮盖 所以需要换成 5个图片的宽度
        if (left < imgItemWidth*5 - thumbWrapper.offsetWidth ) {
            left = imgItemWidth*5 - thumbWrapper.offsetWidth;
        }
        // 设置缩略图包裹元素位置
        thumbWrapper.style.left = left + 'px';
    }
    
    // 通过事件委托 给每个缩略图监听单击事件
    thumbWrapper.onclick = function(event) {
        // 判断点击是img元素 才进行后续操作
        if (event.target.nodeName === 'IMG') {
            // 修改放大镜小图的src地址 使用自定义属性 data-index
            smallImage.src = goodData.imgsrc[event.target.dataset.index].s;
            // 修改放大镜大图的src地址
            largeImage.src = goodData.imgsrc[event.target.dataset.index].b;
        }
    }
})();

// 侧边栏选项卡
(function(){
    // 获取元素
    var tabNavItems = document.querySelectorAll('#siderbarTab .tab-nav-item');      
    var tabPanelItems =  document.querySelectorAll('#siderbarTab .tab-panel-item'); 

    // 调用函数
    tab(tabNavItems,tabPanelItems);
    
})();

// 商品详情选项卡
(function(){
    // 调用函数实现选项卡
    var tabNavItems = document.querySelectorAll('#introTab .tab-nav-item');
    var tabPanelItem = document.querySelectorAll('#introTab .tab-panel-item');
    tab(tabNavItems,tabPanelItem);
})();
