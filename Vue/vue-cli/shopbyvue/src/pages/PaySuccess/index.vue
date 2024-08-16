<template lang="">
    <div>
        <div class="paysuccess">
            <div class="success">
                <h3>
                    
                    <svg t="1723690508049" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2632" width="24" height="24"><path d="M501.01 0C224.501 0 0.395 229.199 0.395 512s224.106 512 500.627 512c276.514 0 500.62-229.199 500.62-512S777.434 0 501.016 0z m-39.104 733L257.939 514.3l52.21-44.304 118.02 97.41c48.011-60.3 155.566-180.6 303.506-276.399l12.418 30.4c-135.817 131.501-247.187 316.798-282.187 411.6z" fill="#06B464" p-id="2633"></path></svg>
                    恭喜您，支付成功啦！
                </h3>
                <div class="paydetail">
                    <p class="button">
                        <a href="myOrder.html" class="btn-look">查看订单</a>
                        <a href="index.html" class="btn-goshop">继续购物</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"PaySuccess",

}
</script>
<style lang="less" scoped>
    .paysuccess {
        margin:20px auto;
        padding: 25px;
        border: 1px solid rgb(211,211,211);
        width: 1200px;
        width:1148px;
        .success {
            width: 500px;
            margin: 0 auto;
            h3 {
                margin: 20px 0;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                img {
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                    margin-right: 14px;
                }
            }
            .paydetail {
                margin-left: 66px;
                font-size: 15px;
                .button {
                    margin: 30px 0;
                    line-height: 26px;
                    a {
                        display: inline-block;
                        box-sizing: border-box;
                        text-align: center;
                        vertical-align: middle;
                        cursor: pointer;
                        border-radius: 2px;
                        user-select: none;
                        font-size: 18px;
                        padding: 4px 20px;
                        line-height: 22px;
                        text-decoration: none;
                        &.btn-look {
                            margin-right: 13px;
                            color: #fff;
                            background-color: #e1251b;
                            border: 1px solid #e1251b;
                        }
                        &.btn-goshop {
                            color: #666;
                            background-color: #eee;
                            border: 1px solid #e1e1e1;
                        }
                    }
                }
            }
        }
    }
</style>