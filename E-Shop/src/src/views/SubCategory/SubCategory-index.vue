<script setup>
import { GetSubCategoryInfoAPI, GetAllCategoryGoodsAPI } from '@/apis/category.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const breadcrumb = ref({});
const loading_flag = ref(true);
const goodList = ref([]);
const reqData = {
  categoryId: useRoute().params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
};
const getData = async () => {
  try {
    const res = await GetSubCategoryInfoAPI(useRoute().params.id);
    breadcrumb.value = res.result;
    const res2 = await GetAllCategoryGoodsAPI(reqData);
    goodList.value = res2.result.items;
  } catch {
    () => {};
  }
  loading_flag.value = false;
};
getData();
const disabled = ref(false);
const load = async () => {
  reqData.page++;
  const res = await GetAllCategoryGoodsAPI(reqData);
  goodList.value = [...goodList.value, ...res.result.items];
  if (res.result.items.length === 0) {
    disabled.value = true;
  }
};
</script>
<template>
  <div class="container" v-loading.fullscreen.lock="loading_flag">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumb.parentName }} </el-breadcrumb-item>
        <el-breadcrumb-item>{{ breadcrumb.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <!-- 子分类名称 -->
      <div
        style="
          text-align: center;
          font-size: 28px;
          font-weight: 600;
          color: #ff6600d0;
          margin: 25px;
          margin-top: 15px;
        "
        v-if="!loading_flag"
      >
        ——&nbsp;&nbsp;{{ breadcrumb.name }}&nbsp;&nbsp;——
      </div>
      <!-- 商品列表-无限加载-->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <GoodsItem v-for="good in goodList" :goods="good" :key="good.id" />
      </div>
      <p v-if="!disabled">Loading...</p>
      <p v-if="disabled">已经到底啦~</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}
.sub-container {
  min-height: 600px;
  padding: 20px 30px;
  background-color: #fff;
  .body {
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    gap: 20px;
    justify-content: space-around;
  }
  p {
    margin-top: 15px;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    color: #999;
  }
}
</style>
