
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

// 商品参数选项 购买数量 搭配商品
(function(){
    /*
        1. 商品参数选项对应价格变化
           1.1 根据参数选项的数据动态创建元素  dl dt dd
           1.2 dd 元素监听单击事件，点击选中，同组内排他
           1.3 点击 dd 元素，创建选中标签； 按照顺序；同组选项互相替换。
           1.4 点击选中标签的删除按钮，本身删除，对应的dd取消选中，且再选中所在组的第一个
           1.5 点击dd元素和选中标签元素，都会修改价格显示； 根据selectedArr数组中的选项进行价格计算
        2. 购买数量
        3. 搭配商品 
    */
    // 获取相应的元素
    var optionsBox = document.querySelector('#optionsBox');    // 参数选项的包裹元素
    var selectedBox = document.querySelector('#selectedBox');  // 选中标签元素的包裹元素
    var priceBox = document.querySelector('#priceBox');   // 显示价格的元素
    var numInput = document.querySelector('#numInput');   // 显示数量的输入框
    var plusBtn = document.querySelector('#plusBtn');     // 数量加 按钮
    var minusBtn = document.querySelector('#minusBtn');     // 数量减 按钮
    var masterPriceBox = document.querySelector('#masterPrice');  // 显示主商品价格
    var totalNumBox = document.querySelector('#totalNumBox');    // 显示搭配商品的数量
    var totalPriceBox = document.querySelector('#totalPrice');    //  显示总价
    var collectionInputs = document.querySelectorAll('#chooseProducts input');   // 所有搭配商品的复选框元素集合

    // 创建数组 用于保存被选中的选项
    var selectedArr = new Array(goodData.goodsDetail.crumbData.length);
    // 定义变量 记录商品数量
    var productNum = 1;
    // 定义变量 记录搭配商品的总价
    var colloctionPrice = 0;
    // 定义变量 记录搭配商品的数量
    var collectionNum = 0;


    // 遍历参数选项的数据  创建dl元素、dt元素、dd元素
    goodData.goodsDetail.crumbData.forEach(function(dlItem, dlIndex) {
        // 创建 dl 元素
        var dlEle = document.createElement('dl');
        // 将 dl 元素添加 optionsBox 中
        optionsBox.appendChild(dlEle);
        // 创建 dt 元素
        var dtEle = document.createElement('dt');
        dtEle.innerHTML = dlItem.title;
        // 将 dt 元素添加到 dl 中
        dlEle.appendChild(dtEle);
        // 遍历每组中的选项数据 
        dlItem.data.forEach(function(ddItem,ddIndex){
            // 创建 dd 元素
            var ddEle = document.createElement('dd');
            ddEle.innerHTML = ddItem.type;
            // 设置自定义属性 记录dl的索引
            ddEle.dataset.groupIndex = dlIndex;
            // 设置自定义属性 记录该选项对应的价格变化
            ddEle.dataset.changePrice = ddItem.changePrice;
            // 如果是第一个选项，默认选中
            if (ddIndex === 0) {
                ddEle.classList.add('active');
            }
            // 将 dd 添加到 dl 中
            dlEle.appendChild(ddEle);
        });
    });

    // 事件委托 给参数选项 dd 元素监听单击事件，委托给包裹元素 optionsBox
    optionsBox.onclick = function(event) {
        // 判断目标元素是 dd，才进行后续操作
        if (event.target.nodeName === 'DD') { 
            // 同一个 dl 中的其他 dd 取消选中
            var siblingEles = event.target.parentElement.children;
            for (var i = 1; i < siblingEles.length; i ++) {
                siblingEles[i].classList.remove('active');
            }

            // 当前点击的 dd 被选中
            event.target.classList.add('active');

            // 将当前的选项元素添加到数组中
            selectedArr[event.target.dataset.groupIndex] = event.target;
            console.log(event.target);
            // 调用函数 创建 selectedTag 选中标签元素
            createSelectedTag();

            // 调用函数修改价格
            changePrice();
        }
    };

    // 事件委托 给选中标签元素上的关闭按钮监听事件，委托给包裹元素 selectedBox
    selectedBox.onclick = function(event) {
        // 判断点击的是关闭按钮
        if (event.target.className === 'close') {
           // 删除所在的选中标签元素
           selectedBox.removeChild(event.target.parentElement);
           
           // 对应的 dd 取消选中，并默认选中每组的第一个
           // 从数组中取出与当前选中标签对应的dd元素
           var ddEle = selectedArr[event.target.parentElement.dataset.index];
           ddEle.classList.remove('active');   // 当前的dd取消选中
           ddEle.parentElement.children[1].classList.add('active');  // 同组的第一个dd选中

           // 把当前的 dd 从数组中删除
           delete selectedArr[event.target.parentElement.dataset.index];

            // 调用函数修改价格
            changePrice();
        }
    };

    // 点击数量加按钮
    plusBtn.onclick = function() {
        // 数量累加
        productNum ++;
        // 修改输入框的值
        numInput.value = productNum;
        // 重新计算价格
        changePrice();
    };

    // 点击数量减按钮
    minusBtn.onclick = function() {
        // 数量累减
        productNum --;
        // 判断数量不能小于 1
        if (productNum < 1) {
            productNum = 1;
        }
        // 修改输入框的值
        numInput.value = productNum;
        // 重新计算价格
        changePrice();
    };

    // 监听到数量输入框有所变换（值改变且失去焦点）
    numInput.onchange = function() {
        // 获取输入框的值
        productNum = +numInput.value;
        // 判断如果是无效
        if (isNaN(productNum) || productNum < 1) {
            productNum = 1;
        };
        // 修改输入框的值
        numInput.value = productNum;
        // 重新计算价格
        changePrice();
    };

    // 给每个搭配商品的复选框监听 change 事件
    collectionInputs.forEach(function(collectionInput) {
        collectionInput.onchange = function() {
            if (collectionInput.checked) {
                // 选中了该搭配商品
                colloctionPrice += (+collectionInput.value);
                // 搭配商品数量++
                collectionNum ++;
            } else {
                // 取消选中该搭配商品
                colloctionPrice -= (+collectionInput.value);
                collectionNum --;
            }
            // 修改价格显示
            changePrice();
            // 显示搭配商品数量
            totalNumBox.innerHTML = collectionNum;
        };
    });


    /**
     * 根据数组 selectedArr 创建 selectedTag 选中标签元素
    */
    function createSelectedTag() {
        // 清空选中标签的包裹元素
        selectedBox.innerHTML = '';

        // 遍历 selectedArr 数组
        selectedArr.forEach(function(ddEle, index){
            // 创建选中标签元素 添加到 selectedBox
            var selectedEle = document.createElement('div');
            selectedEle.className = 'selected-tag';
            selectedEle.innerHTML = ddEle.innerHTML + '<span class="close">&times;</span>';
            selectedEle.dataset.index = index;
            selectedBox.appendChild(selectedEle);
        });
    };


    /**
     * 计算商品的价格 
    */
    function changePrice() {
        // 获取基础价格
        var price = goodData.goodsDetail.price;

        // 根据 selectedArr 中的选中的选项 修改价格
        selectedArr.forEach(function(ddEle) {
            price += (+ddEle.dataset.changePrice);
        });

        // 计算主商品的总价
        var masterPrice = price * productNum;

        // 修改显示价格
        priceBox.innerHTML = masterPrice;
        masterPriceBox.innerHTML = '&yen;' + masterPrice;
        totalPriceBox.innerHTML = '&yen;' + (masterPrice + colloctionPrice);
    };

})();

// 固定侧边导航栏
(function() {
    // 获取元素 
    var pageSierbar = document.querySelector('#pageSierbar');
    var menuBtn = document.querySelector('#menuBtn');
    var topBtn = document.querySelector('#topBtn');

    // 点击菜单按钮
    menuBtn.onclick = function() {
        pageSierbar.classList.toggle('open');
    };

    // 点击返回顶部
    topBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

})();

