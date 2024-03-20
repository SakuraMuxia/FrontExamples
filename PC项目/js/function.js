/*
 * @Author: yuluo 2216847528@qq.com
 * @Date: 2024-03-19 17:09:58
 * @LastEditors: yuluo 2216847528@qq.com
 * @LastEditTime: 2024-03-20 17:03:32
 * @FilePath: \FrontExamples\PC项目\js\function.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 函数库

/**
 * 获取元素的计算属性
 * @param Elment ele 元素
 * @param String attr css属性名
 * @param String 计算属性值
 */



function getStyle(ele, attr) {
    if (window.getComputedStyle) {
       return  getComputedStyle(ele)[attr];
    } else {
      // IE的兼容性处理
       return ele.currentStyle[attr];
    }  
}


/**
 * 选项卡函数
 * @params nodeList 选项卡导航按钮的集合
 * @params nodeList 选项卡内容项目的集合
 * @params 不写return 返回undefined
 */
function tab(tabNavItems, tabPanelItems) {
   // 遍历选项卡导航按钮 监听单击事件
   tabNavItems.forEach(function(tabNavItem, index){
       tabNavItem.onclick = function() {
           // 排他 所有tabNavItem取消选中 所有tabPanelItem取消选中
           for (var i = 0; i < tabNavItems.length; i ++) {
               tabNavItems[i].classList.remove('active');
               tabPanelItems[i].classList.remove('active');
           }
           // 当前点击的按钮和panel选中
           tabNavItem.classList.add('active');
           tabPanelItems[index].classList.add('active');
       }
   });
}