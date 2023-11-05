<script setup>
import { useRoute } from 'vue-router';
import { GetOrderInfoAPI } from '@/apis/order';
import { ref } from 'vue';
const fomartPayState = (payState) => {
  const stateMap = {
    1: '待付款',
    2: '待发货',
    3: '待收货',
    4: '已完成',
    5: '已完成',
    6: '已取消'
  };
  return stateMap[payState];
};
const route = useRoute();
const order = ref({});
const loading_flag = ref(true);
(async () => {
  const res = await GetOrderInfoAPI(route.params.id);
  order.value = res.result;
  loading_flag.value = false;
})();
</script>
<template>
  <div>
    <div class="container" v-loading="loading_flag">
      <!-- 订单信息 -->
      <div class="outer-box">
        <div>订单信息</div>
        <div class="inner-box">
          <span>订单状态：</span>
          <span style="font-weight: 600; font-size: 17px; color: #555">{{
            fomartPayState(order.orderState)
          }}</span>
          <span>订单编号：</span>
          <span>{{ order.id }}</span>
          <span>下单时间：</span>
          <span>{{ order.createTime }}</span>
          <span>支付方式：</span>
          <span>{{ order.orderState == 1 || order.orderState == 6 ? '未付款' : 'E-Pay' }}</span>
          <span>支付时间：</span>
          <span>{{
            order.orderState == 1 || order.orderState == 6 ? '未付款' : order.payTime
          }}</span>
          <span>配送时间：</span>
          <span>周一至周日</span>
        </div>
      </div>
      <!-- 收货信息 -->
      <div class="outer-box">
        <div>收货信息</div>
        <div class="inner-box">
          <span style="margin-right: 40.5px">收货人：</span>
          <span>{{ order.receiverContact }}</span>
          <span>联系方式：</span>
          <span>{{ order.receiverMobile }}</span>
          <span>收货地址：</span>
          <span>{{ order.receiverAddress }}</span>
        </div>
      </div>
      <!-- 商品信息 -->
      <span style="font-size: 19px; margin-bottom: 25px">订单商品</span>
      <table class="goods">
        <thead>
          <tr>
            <th width="520">商品信息</th>
            <th width="170">单价</th>
            <th width="170">数量</th>
            <th width="170">实付</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in order.skus" :key="i.id">
            <td>
              <RouterLink class="info" :to="`/product/${i.spuId}`" target="_blank">
                <img v-img-lazy="i.image" alt="" />
                <div class="right">
                  <p>{{ i.name }}</p>
                  <p>{{ i.attrsText }}</p>
                </div>
              </RouterLink>
            </td>
            <td>&yen;{{ i.curPrice }}</td>
            <td>{{ i.quantity }}</td>
            <td>&yen;{{ i.realPay }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 价格统计 -->
      <div class="total">
        <dl>
          <dt>商品件数：</dt>
          <dd>{{ order.totalNum }}件</dd>
        </dl>
        <dl>
          <dt>商品总价：</dt>
          <dd>￥{{ order.totalMoney }}</dd>
        </dl>
        <dl>
          <dt>运<i></i>费：</dt>
          <dd>￥{{ order.postFee }}</dd>
        </dl>
        <dl>
          <dt>应付总额：</dt>
          <dd class="price">￥{{ order.payMoney }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  width: 1000px;
  align-items: flex-start;
  margin-top: 20px;
  padding: 75px 0 75px 75px;
  background-color: #fff;
  .goods {
    width: 850px;
    border-collapse: collapse;
    border-spacing: 0;
    .info {
      display: flex;
      text-align: left;
      align-items: center;
      transition: all 0.1s;
      &:hover {
        color: $themeColor;
      }
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .right {
        line-height: 24px;
        height: fit-content;
        p {
          &:last-child {
            color: #999;
          }
        }
      }
    }
    tr {
      th {
        background: #f5f5f5;
        font-weight: normal;
      }
      td,
      th {
        text-align: center;
        padding: 20px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          border-left: 1px solid #f5f5f5;
        }
        &:last-child {
          border-right: 1px solid #f5f5f5;
        }
      }
    }
  }
  .total {
    align-self: flex-end;
    margin-top: 35px;
    margin-right: 8px;
    dl {
      display: flex;
      justify-content: flex-end;
      line-height: 50px;
      dt {
        i {
          display: inline-block;
          width: 2em;
        }
      }
      dd {
        width: 240px;
        text-align: right;
        padding-right: 70px;
        &.price {
          font-size: 20px;
          color: $priceColor;
        }
      }
    }
  }
  .outer-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 25px;
    div {
      &:first-child {
        margin-bottom: 25px;
        font-size: 19px;
      }
    }
  }
  .inner-box {
    width: 850px;
    border: 1px solid #ddd;
    padding: 25px;
    overflow: hidden;
    span {
      line-height: 30px;
      color: #999;
      width: 100px;
      margin-right: 25px;
      &:nth-child(2n) {
        margin-right: 0;
        color: black;
        &::after {
          display: block;
          content: '';
        }
      }
    }
  }
}
</style>
