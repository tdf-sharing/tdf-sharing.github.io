<script setup>
import { GetUserLikeListAPI } from '@/apis/user';
import { UseUserStore } from '@/stores/user';
import { ref } from 'vue';
import GoodsItem from '@/components/Good-index.vue';
const userStore = UseUserStore();
const likeList = ref([]);
const loading_flag = ref([true]);
(async () => {
  const res = await GetUserLikeListAPI({
    limit: 4
  });
  likeList.value = res.result;
  loading_flag.value = false;
})();
</script>
<template>
  <div class="home-overview">
    <!-- 用户信息 -->
    <div class="user-meta">
      <div class="avatar">
        <img v-img-lazy="userStore.userinfo?.avatar" />
      </div>
      <h4>{{ `User_${userStore.userinfo?.id - 194}` }}</h4>
    </div>
  </div>
  <!-- 推荐列表 -->
  <div class="like-container" v-loading="loading_flag">
    <div class="home-panel">
      <div class="header">
        <h4>甄品推荐</h4>
      </div>
      <div class="goods-list">
        <GoodsItem v-for="good in likeList" :key="good.id" :goods="good" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.home-overview {
  height: 132px;
  background-color: #ff6600cc;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      border: #fff solid 3px;
      overflow: hidden;
      margin-left: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      padding-left: 26px;
      font-size: 20px;
      font-weight: 600;
      color: white;
    }
  }
}
.like-container {
  margin-top: 20px;
  border-radius: 4px;
  background-color: #fff;
}
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    h4 {
      margin-left: 10.5px;
      font-size: 22px;
      font-weight: 600;
      color: #333;
      letter-spacing: 1px;
    }
  }
  .goods-list {
    display: flex;
    justify-content: space-around;
  }
}
</style>
