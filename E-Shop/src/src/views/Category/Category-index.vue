<script setup>
import { ref } from 'vue';
import { GetSubCategoryListAPI } from '@/apis/category.js';
import { useRoute } from 'vue-router';
const categoryData = ref({});
const loading_flag = ref(true);
(async () => {
  const res = await GetSubCategoryListAPI(useRoute().params.id);
  categoryData.value = res.result;
  loading_flag.value = false;
})();
</script>
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 分类总览 -->
      <div class="sub-list" v-loading="loading_flag">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img v-img-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 分类商品 -->
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div>
          <h3 style="font-size: 22px; color: #ff6600d0">
            —&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;—
          </h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #333;
    font-weight: 600;
    text-align: center;
    line-height: 85px;
    margin-bottom: -5px;
  }
  .sub-list {
    background-color: #fff;
    min-height: 240px;
    ul {
      display: flex;
      padding: 0 32px;
      justify-content: center;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $themeColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }
  .bread-container {
    padding: 25px 0;
  }
}
</style>
