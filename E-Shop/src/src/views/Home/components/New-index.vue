<script setup>
import panel from './components/Panel-index.vue';
import { ref } from 'vue';
import { GetHomeNewListAPI } from '@/apis/home.js';
const newList = ref([]);
const loading_flag = ref(true);
(async () => {
  const res = await GetHomeNewListAPI();
  newList.value = res.result;
  loading_flag.value = false;
})();
</script>
<template>
  <panel
    title="新品推荐"
    sub-title="潮流时尚 · 独树一帜"
    style="padding-bottom: 60px"
    v-loading="loading_flag"
    element-loading-background="#fff"
  >
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink :to="`/product/${item.id}`">
          <div class="img_container img-loading">
            <img v-img-lazy="item.picture" alt="" />
          </div>
          <p>{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </panel>
</template>
<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 300px;
    height: 406px;
    transition: all 0.3s;
    background-color: #fff;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    }
    img,
    .img_container {
      width: 300px;
      height: 306px;
      background-color: #f2f2f2;
    }
    p {
      margin: 20px 50px -7.5px 50px;
      font-size: 18px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      font-size: 22px;
      font-weight: 600;
      color: $priceColor;
    }
  }
}
</style>
