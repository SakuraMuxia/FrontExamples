<template lang="">
    <div>
        <div class="preview">
        <vue-photo-zoom-pro
                :out-zoomer="true"
                :width="200"
                :height="200"
                :high-url="imgUrl">
            <img :src="imgUrl" />
        </vue-photo-zoom-pro>
    </div>
    </div>
</template>
<script>
import VuePhotoZoomPro from 'vue-photo-zoom-pro';
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css';
import { mapState } from 'vuex';

export default {
    name:"Zoom",
    data(){
        return{
            
        }
    },
    components:{
        VuePhotoZoomPro,
    },
    computed:{
        ...mapState("product",{
            skuImageList(state){
                return state.productInfo.skuInfo.skuImageList;
            }
        }),
        imgUrl(){
            // 获取isDefault === "1"的缩略图对象
            const imgItem = this.skuImageList.find(v => v.isDefault === "1");
            // 判断 imgItem 存在,返回缩略图的地址
            if (imgItem) return imgItem.imgUrl;
            return imgItem;
        }
    }
}
</script>
<style lang="less">
    .preview {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid #DFDFDF;
        img {
                width: 100%;
                height: 100%;
        }
        .zoomer {
            z-index: 999;
            top: 0 !important;
            left: 10px !important;
        }
        .selector {
            background-color: rgba(255, 0, 0, 0.3);
        }
    }
</style>