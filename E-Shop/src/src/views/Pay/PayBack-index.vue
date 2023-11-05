<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<template>
  <div>
    <div class="container">
      <!-- 支付结果 -->
      <div class="pay-result">
        <span class="iconfont icon-queren2 green"></span>
        <p class="tit">支付成功</p>
        <p class="tip">可至我的订单进行模拟发货等后续操作~</p>
        <p>支付方式：<span>E-Pay</span></p>
        <p>
          支付金额：<span>¥{{ route.query.money }}</span>
        </p>
        <!-- 按钮区 -->
        <div class="btn">
          <RouterLink replace :to="`/order/${route.query.orderId}`"
            ><el-button type="primary" style="margin-right: 20px">查看订单</el-button></RouterLink
          >
          <RouterLink replace to="/"><el-button>进入首页</el-button></RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .tit {
    margin-top: 10px;
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>
