<script setup>
import HomePanel from './components/Panel-index.vue';
import { GetHomeMoreListAPI } from '@/apis/home.js';
import { ref } from 'vue';
const hotList = ref([]);
const loading_flag = ref(true);
(async () => {
  const res = await GetHomeMoreListAPI();
  hotList.value = res.result;
  loading_flag.value = false;
})();
</script>
<template>
  <HomePanel title="更多精彩" v-loading="loading_flag" element-loading-background="#fff">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <div>
          <div class="img_container img-loading">
            <img v-img-lazy="item.picture" alt="" />
          </div>
          <p>{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </div>
      </li>
    </ul>
  </HomePanel>
</template>
<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 300px;
    height: 406px;
    transition: all 0.5s;
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
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
