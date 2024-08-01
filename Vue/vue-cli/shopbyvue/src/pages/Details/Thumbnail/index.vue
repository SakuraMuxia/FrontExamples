<template lang="">
    <div>
        <div class="specScroll">
            <!--左按钮-->
            <a class="prev">&lt;</a>
            <!-- 中间可滑动区域 使用swiper实现 第三方-->
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide v-for="item in skuImageList" :key="item.id" >
                    <img :class="{active:item.isDefault/1 === 1}" @click="changeImg(item.id)" :src="item.imgUrl" />
                </swiper-slide>
            </swiper>
            <!--右按钮-->
            <a class="next">&gt;</a>
        </div>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapState } from 'vuex';
export default {
    name:"Thumbnail",
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 5,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.next',
                    prevEl: '.prev'
                }
            }
        }
    },
    computed:{
        ...mapState("product",{
            skuImageList(state){
                return state.productInfo.skuInfo.skuImageList;
            }
        })
    },
    methods:{
        changeImg(id) {
            this.$store.commit("product/SAVE_SKUIMAGE_DEFAULT", id);
        }
    }
}
</script>
<style lang="less" scoped>
.specScroll {
    margin-top: 5px;
    width: 400px;
    overflow: hidden;
    display: flex;
    .prev,.next {
        text-align: center;
        width: 10px;
        height: 54px;
        line-height: 54px;
        border: 1px solid #CCC;
        background: #EBEBEB;
        cursor: pointer;
    }
    img {
        text-align: center;
        border: 1px solid #CCC;
        padding: 2px 6px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        cursor: pointer;
        &.active{
            border-color: red;
        }
    }
    .swiper {
        width: 100%;
        margin: 0 10px;
    }
}
        
</style>