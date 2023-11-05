<script setup></script>
<template>
  <div class="container">
    <div class="member-aside">
      <div class="user-manage">
        <h4>我的账户</h4>
        <div class="links">
          <RouterLink to="/user">个人中心</RouterLink>
        </div>
        <h4>交易管理</h4>
        <div class="links">
          <RouterLink to="/user/order">我的订单</RouterLink>
        </div>
      </div>
    </div>
    <div class="article">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  padding-top: 20px;
  .member-aside {
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    background-color: #fff;
    .user-manage {
      background-color: #fff;
      h4 {
        font-size: 18px;
        font-weight: 400;
        padding: 20px 52px 5px;
        border-top: 1px solid #f6f6f6;
      }
      .links {
        padding: 0 52px 10px;
      }
      a {
        display: block;
        line-height: 1;
        padding: 15px 0;
        font-size: 14px;
        color: #666;
        position: relative;
        transition: all 0.1s;
        &:hover {
          color: $themeColor;
        }
        &.active,
        &.router-link-exact-active {
          color: $themeColor;
          &:before {
            display: block;
          }
        }
        &:before {
          content: '';
          display: none;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 19px;
          left: -16px;
          background-color: $themeColor;
        }
      }
    }
  }
  .article {
    width: 1000px;
    background-color: #fff;
  }
}
</style>
