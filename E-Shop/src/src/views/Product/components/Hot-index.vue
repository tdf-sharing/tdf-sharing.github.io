<script setup>
import { ref, computed } from 'vue';
import { GetProductHotListAPI } from '@/apis/product';
import { useRoute } from 'vue-router';
const props = defineProps({
  type: {
    type: Number, // 1代表24小时热销榜 2代表周热销榜
    default: 1
  }
});
const TITLEMAP = {
  1: '24小时热榜',
  2: '周热榜'
};
const title = computed(() => TITLEMAP[props.type]);
const goodList = ref([]);
const route = useRoute();
const getHotList = async () => {
  const res = await GetProductHotListAPI({
    id: route.params.id,
    type: props.type
  });
  goodList.value = res.result;
};
getHotList();
</script>
<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div style="height: 15px; background-color: #fff"></div>
    <!-- 商品区块 -->
    <RouterLink
      :to="`/product/${item.id}`"
      class="goods-item"
      v-for="item in goodList"
      :key="item.id"
    >
      <img v-img-lazy="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
    <div style="height: 15px; background-color: #fff"></div>
    <div style="height: 30px"></div>
  </div>
</template>
<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $themeColor;
    color: #fff;
    font-size: 20px;
    line-height: 70px;
    padding-left: 25px;
    font-weight: 600;
  }
  .goods-item {
    display: block;
    padding: 15px 30px;
    text-align: center;
    background: #fff;
    &:hover .name,
    &:hover .desc {
      color: $themeColor;
    }
    img {
      width: 220px;
      height: 220px;
    }
    .name {
      padding: 0 25px;
      padding-top: 8px;
      font-size: 18px;
      transition: all ease-in-out 0.2s;
      font-weight: 600;
    }
    .desc {
      padding: 0 5px;
      padding-top: 3.5px;
      color: #999 !important;
      font-size: 14px;
      height: 29px;
      transition: all ease-in-out 0.2s;
    }
    .price {
      padding-top: 3px;
      color: $priceColor;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
