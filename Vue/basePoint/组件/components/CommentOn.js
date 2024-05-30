import PageList from "./PageList.js";
// 评论展示模版
const template = (`
    <div class="commentOn">
        <div class="noContent">暂无留言</div>
        <div class="messList">
            <div class="reply">
                <p class="replyContent">内容</p>
                <p class="operation">
                    <span class="replyTime">2020.03.10 01:01:01</span>
                    <span class="handle">
                        <a href="javascript:;" class="top">0</a>
                        <a href="javascript:;" class="down_icon">9</a>
                        <a href="javascript:;" class="cut">删除</a>
                    </span>
                </p>
            </div>
        </div>
        <page-list></page-list>
    </div>
`)
const components = {
    PageList
}
export default {
    template,
    // 组件的嵌套
    components
}