<script setup>
import { UseCategoryStore } from '@/stores/category.js';
import Header_Cart from './components/Cart-index.vue';
const category = UseCategoryStore();
</script>
<template>
  <header class="app-header">
    <div class="container">
      <!-- Logo -->
      <h1 class="logo">
        <div></div>
      </h1>
      <!-- 导航栏 -->
      <ul class="app-header-nav">
        <li>
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li v-for="item in category.listdata" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{
            item.name
          }}</RouterLink>
        </li>
      </ul>
      <!-- 头部购物车 -->
      <Header_Cart />
    </div>
  </header>
</template>
<style scoped lang="scss">
.app-header {
  background: rgba($color: #fff, $alpha: 0.95);
  position: sticky;
  top: 0;
  z-index: 100;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    width: 50px;
    div {
      display: block;
      height: 85px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center;
      background-size: contain;
    }
  }
  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
        &:hover {
          color: $themeColor;
          border-bottom: 1px solid $themeColor;
        }
      }
      .active {
        color: $themeColor;
        border-bottom: 1px solid $themeColor;
      }
    }
  }
}
</style>
