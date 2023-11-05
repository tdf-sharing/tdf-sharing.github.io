<script setup>
import { UseUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';
import { UseMessage } from '@/composables/groupedmessage';
import { ElMessageBox } from 'element-plus';
const User = UseUserStore();
const router = useRouter();
const clear = () => {
  User.clear_user_info();
  router.replace('/');
};
const logout = () => {
  ElMessageBox.confirm('是否退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      clear();
      UseMessage.success('已注销');
    })
    .catch(() => {});
};
</script>
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="User.userinfo.token">
          <li>
            <RouterLink to="/user"
              ><i class="iconfont icon-user"></i>{{ ` User_${User.userinfo.id - 194}` }}</RouterLink
            >
          </li>
          <li><RouterLink to="/user/order">我的订单</RouterLink></li>
          <li>
            <a href="javascript:;" style="padding-right: 3px" @click="logout">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">登录</RouterLink></li>
          <li>
            <a
              target="_blank"
              href="https://github.com/tdf-sharing/tdf-sharing.github.io/tree/main/E-Shop"
              style="padding-right: 3px"
              >关于</a
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<style scoped lang="scss">
.app-topnav {
  background: #3f3f3f;
  font-size: 12px;
  ul {
    display: flex;
    height: 40px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: #fff;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
