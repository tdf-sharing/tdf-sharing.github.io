<script setup>
import { GetPayInfoAPI, PayAPI } from '@/apis/check&pay';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { UseCountDown } from '@/composables/countdown';
import { ElMessageBox } from 'element-plus';
import router from '@/router';
const { format_time, start } = UseCountDown();
const loading_flag_1 = ref(true);
const loading_flag_2 = ref(false);
const route = useRoute();
const payInfo = ref({});
(async () => {
  const res = await GetPayInfoAPI(route.query.id);
  payInfo.value = res.result;
  start(res.result.countdown);
  loading_flag_1.value = false;
})();
const paymethod = () => {
  ElMessageBox.confirm('是否模拟支付', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      loading_flag_2.value = true;
      await PayAPI(route.query.id);
      router.replace({
        path: '../paycallback',
        query: {
          orderId: route.query.id,
          money: payInfo.value.payMoney
        }
      });
      loading_flag_2.value = false;
    })
    .catch(() => {
      loading_flag_2.value = false;
    });
};
</script>
<template>
  <div class="pay-page">
    <div class="container" v-loading.fullscreen.lock="loading_flag_2">
      <!-- 付款信息 -->
      <div class="pay-info" v-loading="loading_flag_1">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>
            订单已提交成功！请在
            <span style="font-weight: 600; color: #ff6700">{{ format_time }}</span> 内完成支付
          </p>
          <p style="margin-top: 7.5px">超时订单将被取消</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span style="font-weight: 600">¥{{ payInfo.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <div style="display: flex">
          <p style="font-weight: 600; font-size: 20px">支付方式：</p>
          <div class="btn" @click="paymethod">E-Pay</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.pay-page {
  margin-top: 20px;
}
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  p {
    line-height: 80px;
    height: 80px;
    padding-left: 30px;
    font-size: 16px;
  }
  .btn {
    width: 110px;
    height: 50px;
    border: 1px solid #999;
    border-radius: 110px;
    text-align: center;
    line-height: 48px;
    margin-left: 20px;
    color: #666;
    display: inline-block;
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
    cursor: pointer;
    &.active,
    &:hover {
      border-color: $themeColor;
      color: $themeColor;
    }
  }
}
</style>
