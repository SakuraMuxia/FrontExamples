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
    // 根据数据 创建缩略图元素
    goodData.imgsrc.forEach(function(imgItem,index){
        // 创建 img 元素,并设置src
        var imgBox = new Image();
        imgBox.src = imgItem.s;
        imgBox.dataset.index = index;
        // 将 img 元素添加到缩略图包裹元素中
        thumbWrapper.appendChild(imgBox);
    });
    // 计算单个图片所占的位置  自己的宽度+右边距
    var imgItemWidth = thumbWrapper.firstElementChild.offsetWidth +  parseInt(getStyle(thumbWrapper.firstElementChild, 'marginRight'));
})();