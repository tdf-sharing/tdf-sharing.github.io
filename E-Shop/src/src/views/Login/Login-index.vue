<script setup>
import { UseMessage } from '@/composables/groupedmessage';
import { useRouter } from 'vue-router';
import { UseUserStore } from '@/stores/user.js';
import { UseBusStore } from '@/stores/bus.js';
import { onUnmounted, ref } from 'vue';
const props = {
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node;
    let nodes;
    if (level == 0) {
      let id = 0;
      nodes = Array.from({
        length: 10
      }).map(() => ({
        value: (id += 10),
        label: `账号（${id - 9}-${id}）`,
        leaf: false
      }));
    } else {
      let id = node.value - 10;
      nodes = Array.from({
        length: 10
      }).map(() => ({
        value: ++id,
        label: `测试账号 - ${id}`,
        leaf: true
      }));
    }
    resolve(nodes);
  }
};
const loading_flag = ref(false);
const account = ref();
const loginto = UseBusStore();
const User = UseUserStore();
const router = useRouter();
const submit = async () => {
  loading_flag.value = true;
  try {
    if (account.value) {
      await User.get_user_info({
        account: `heima${account.value + 194}`,
        password: 'hm#qd@23!'
      });
      UseMessage.success('登录成功');
      router.replace(loginto.get_towhere());
    } else {
      UseMessage.warning('请选择账号');
    }
  } catch {
    () => {};
  }
  loading_flag.value = false;
};
onUnmounted(loginto.get_towhere);
</script>
<template>
  <div class="container" v-loading.fullscreen.lock="loading_flag">
    <!-- Logo -->
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="" loading="lazy" />
      <span>E-Shop</span>
    </div>
    <!-- 首页导航 -->
    <RouterLink
      style="
        position: absolute;
        top: 25px;
        right: 45px;
        font-size: 18px;
        color: #333;
        font-weight: 600;
        line-height: 50px;
      "
      to="/"
      >首页 ></RouterLink
    >
    <!-- 登录框 -->
    <div class="wrapper">
      <nav>
        <a href="javascript:;" style="font-weight: 600; cursor: default">登录</a>
      </nav>
      <!-- 交互框 -->
      <div class="account-box">
        <div class="form">
          <span style="margin-left: 21.5px">选择账号：</span>
          <el-cascader
            size="large"
            :props="props"
            :show-all-levels="false"
            @change="(e) => (account = e[1])"
            placeholder="待选择"
          />
          <div style="margin-top: 15px; font-size: 12px; text-align: center; color: #999">
            注意：账号可能被多人同时使用
          </div>
          <el-button
            size="large"
            type="primary"
            style="margin-top: 15px; width: 100%"
            @click="submit"
            >点击登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fcfcfb;
  justify-content: center;
  align-items: center;
  position: relative;
  > a {
    &:hover {
      color: $themeColor !important;
    }
  }
  .logo {
    position: absolute;
    top: 25px;
    left: 25px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
    span {
      margin-left: 10px;
      font-size: 30px;
      font-weight: 600;
    }
  }
}
.wrapper {
  width: 380px;
  background: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  border-radius: 7.5px;
  nav {
    font-size: 14px;
    height: 55px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    padding: 0 40px;
    text-align: right;
    align-items: center;
    a {
      flex: 1;
      line-height: 1;
      display: inline-block;
      font-size: 18px;
      position: relative;
      text-align: center;
    }
  }
}
.account-box {
  .form {
    padding: 0 20px 20px 20px;
    &-item {
      margin-bottom: 28px;
    }
  }
}
</style>
