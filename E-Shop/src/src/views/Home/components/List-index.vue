<script setup>
import HomePanel from './components/Panel-index.vue';
import { GetHomeGoodsListAPI } from '@/apis/home.js';
import { ref } from 'vue';
const goodsProduct = ref([]);
(async () => {
  const { result } = await GetHomeGoodsListAPI();
  goodsProduct.value = result;
})();
</script>
<template>
  <div class="home-product">
    <HomePanel
      :title="cate.name"
      v-for="cate in goodsProduct"
      :key="cate.id"
      style="background-color: #fff"
    >
      <div class="box">
        <RouterLink class="cover" :to="'/category/' + cate.id">
          <div class="img_container img-loading">
            <img v-img-lazy="cate.picture" />
          </div>
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span class="ellipsis">{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="goods.id">
            <GoodsItem :goods="goods" style="background-color: #fff" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>
<style scoped lang="scss">
.home-product {
  background-color: #fff;
  padding-bottom: 60px;
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 580px;
      margin-right: 10px;
      position: relative;
      transition: all ease-in-out 0.2s;
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
      }
      img,
      .img_container {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #f2f2f2;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        margin: 0 15.5px 30px 15.5px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
