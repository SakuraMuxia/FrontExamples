<template lang="">
    <div class="copyright">
        <ul class="helpLink">
            <li>关于我们
                <span class="space"></span>
            </li>
            <li>联系我们
                <span class="space"></span>
            </li>
            <li>关于我们
                <span class="space"></span>
            </li>
            <li>商家入驻
                <span class="space"></span>
            </li>
            <li>营销中心
                <span class="space"></span>
            </li>
            <li>友情链接
                <span class="space"></span>
            </li>
            <li>关于我们
                <span class="space"></span>
            </li>
            <li>营销中心
                <span class="space"></span>
            </li>
            <li>友情链接
                <span class="space"></span>
            </li>
            <li>关于我们</li>
        </ul>
        <p>地址：北京市昌平区宏福科技园综合楼6层</p>
        <p>京ICP备19006430号</p>
    </div>
</template>
<script>
export default {
    name:"CopyRight",

}
</script>
<style lang="less" scoped>
.copyright {
    padding: 20px;

    .helpLink {
        text-align: center;

        li {
            display: inline;

            .space {
                border-left: 1px solid #666;
                width: 1px;
                height: 13px;
                background: #666;
                margin: 8px 10px;
            }
        }
    }

    p {
        margin: 10px 0;
        text-align: center;
    }
}
</style>