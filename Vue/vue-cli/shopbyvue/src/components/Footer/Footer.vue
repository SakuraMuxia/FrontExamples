<template lang="">
    <!-- 隐藏Footer列表信息 -->
    <div v-if="!$route.meta.isHideFooterList" class="footer">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/团购</li>
                        <li>常见问题</li>
                        <li>购物指南</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>海外配送</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>支付方式</h4>
                    <ul class="footerItemCon">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>特色服务</h4>
                    <ul class="footerItemCon">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                        <li>尚品汇E卡</li>
                        <li>尚品汇通信</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>帮助中心</h4>
                    <img src="./images/wx_cz.jpg">
                </div>
            </div>
            <CopyRight></CopyRight>
        </div>
    </div>
    <CopyRight v-else></CopyRight>
</template>
<script>
import CopyRight from '@/components/Footer/CopyRight';
export default {
    name: "Footer",
    components: {
        CopyRight,
    },
}
</script>
<style lang="less">
.footer {
    background-color: #eaeaea;

    .footer-container {
        width: 1200px;
        margin: 0 auto;
        padding: 0 15px;

        .footerList {
            padding: 20px;
            border-bottom: 1px solid #e4e1e1;
            border-top: 1px solid #e4e1e1;
            overflow: hidden;
            padding-left: 40px;

            .footerItem {
                width: 16.6666667%;
                float: left;

                h4 {
                    font-size: 14px;
                }

                .footerItemCon {
                    li {
                        line-height: 18px;
                    }
                }

                &:last-child img {
                    width: 121px;
                }
            }
        }
    }
}
</style>