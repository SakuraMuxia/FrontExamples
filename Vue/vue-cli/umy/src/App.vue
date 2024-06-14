<template>
  <div>
    <div v-for="item in goodsList" :key="item.id">
      <p>商品名称：{{ item.goodsName }}</p>
      <p>商品价格：{{ item.goodsPrice | currency(3) }}</p>
      <p>上架时间：{{ item.addTime | date }}</p>
      <hr />
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      goodsList: [
        {
          id: 1,
          goodsName: "app->1",
          goodsPrice: 19.123,
          addTime: Date.now(),
        },
        {
          id: 2,
          goodsName: "app->2",
          goodsPrice: 34.456,
          addTime: Date.now() - 99999999,
        },
      ],
    };
  },
};
</script>

<style lang="less"></style>
