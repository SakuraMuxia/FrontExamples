<template lang="">
    <div>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in focusList" :key="item.id" >
                <img :src="item.imgUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapState } from 'vuex';

export default {
    name:"MainAdv",
    components:{
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
    mounted(){
        this.$store.dispatch('adv/getFocusListAsync');
    },
    computed:{
        ...mapState("adv", ["focusList"])
    },
}
</script>
<style lang="less">
.swiper {
    height: 100%;
    img {
        width: 100%;
    }
}
</style>