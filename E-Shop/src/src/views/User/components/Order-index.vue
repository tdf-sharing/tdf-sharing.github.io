<script setup>
import { computed, ref } from 'vue';
import {
  CancelOrderAPI,
  StartOrderShipAPI,
  ConfirmOrderReceivedAPI,
  DeleteOrderAPI,
  GetUserOrderAPI
} from '@/apis/order';
import { ElMessageBox } from 'element-plus';
import { UseMessage } from '@/composables/groupedmessage';
import { UseCountDown } from '@/composables/countdown';
const loading_flag = ref([true]);
const tabTypes = [
  {
    name: 'all',
    label: '全部订单'
  },
  {
    name: 'unpay',
    label: '待付款'
  },
  {
    name: 'deliver',
    label: '待发货'
  },
  {
    name: 'receive',
    label: '待收货'
  },
  {
    name: 'complete',
    label: '已完成'
  },
  {
    name: 'cancel',
    label: '已取消'
  }
];
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
const orderList = ref([]);
const total = ref(0);
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 3
});
const countdown = computed(() =>
  orderList.value
    .filter((x) => x.orderState === 1)
    .map((x) => {
      const { format_time, start } = UseCountDown();
      start(x.countdown);
      return {
        id: x.id,
        ft: format_time
      };
    })
);
const getOrderList = async () => {
  let res = await GetUserOrderAPI(params.value);
  if (res.result.pages < params.value.page) {
    params.value.page = res.result.pages;
    res = await GetUserOrderAPI(params.value);
  }
  orderList.value = res.result.items;
  total.value = res.result.counts;
  loading_flag.value = false;
};
getOrderList();
const cancel = (id) => {
  ElMessageBox.confirm('是否取消订单', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      loading_flag.value = true;
      await CancelOrderAPI(id);
      await getOrderList();
      UseMessage.success('已取消');
    })
    .catch(() => {});
};
const del = (id) => {
  ElMessageBox.confirm('是否删除订单', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      loading_flag.value = true;
      await DeleteOrderAPI([id]);
      await getOrderList();
      UseMessage.success('已删除');
    })
    .catch(() => {});
};
const ship = (id) => {
  ElMessageBox.confirm('是否模拟发货', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      loading_flag.value = true;
      await StartOrderShipAPI(id);
      await getOrderList();
      UseMessage.success('已发货');
    })
    .catch(() => {});
};
const confirmorder = (id) => {
  ElMessageBox.confirm('是否确认收货', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      loading_flag.value = true;
      await ConfirmOrderReceivedAPI(id);
      await getOrderList();
      UseMessage.success('已收货');
    })
    .catch(() => {});
};
const tabChange = (type) => {
  loading_flag.value = true;
  if (type == 5) type++;
  params.value.orderState = type;
  params.value.page = 1;
  getOrderList();
};
const pageChange = (page) => {
  loading_flag.value = true;
  params.value.page = page;
  getOrderList();
};
</script>
<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange" v-loading="loading_flag">
      <!-- tab切换 -->
      <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />
      <div class="main-container">
        <!-- 无订单数据时占位符 -->
        <div class="holder-container" v-if="orderList.length === 0 && !loading_flag">
          <el-empty description="暂无订单数据" />
        </div>
        <!-- 订单列表 -->
        <div v-else>
          <div class="order-item" v-for="order in orderList" :key="order.id">
            <!-- 订单表头信息 -->
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
              <span>订单编号：{{ order.id }}</span>
              <span class="down-time" v-if="order.orderState === 1">
                <i class="iconfont icon-down-time"></i>
                <b
                  >付款截止:
                  <span style="font-weight: 600">
                    &nbsp;{{ countdown.find((x) => x.id === order.id)?.ft.value }}</span
                  ></b
                >
              </span>
            </div>
            <div class="body">
              <!-- 商品详情列表 -->
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <RouterLink
                      style="display: flex; align-items: center"
                      :to="`/product/${item.spuId}`"
                      target="_blank"
                    >
                      <img v-img-lazy="item.image" alt="" class="image" />
                      <div class="info">
                        <p class="name ellipsis-wrap">
                          {{ item.name }}
                        </p>
                        <p class="attr ellipsis">
                          <span>{{ item.attrsText }}</span>
                        </p>
                      </div>
                    </RouterLink>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <!-- 价格小计 -->
              <div class="column state">
                <p>{{ fomartPayState(order.orderState) }}</p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                <p v-if="order.postFee">（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                <p v-else>（包邮）</p>
                <p>在线支付</p>
              </div>
              <!-- 交互按钮区 -->
              <div class="column action">
                <el-button
                  v-if="order.orderState === 1"
                  type="primary"
                  size="small"
                  @click="
                    $router.push({
                      path: '/pay',
                      query: {
                        id: order.id
                      }
                    })
                  "
                >
                  立即付款
                </el-button>
                <el-button
                  v-if="order.orderState === 2"
                  type="primary"
                  size="small"
                  @click="() => ship(order.id)"
                >
                  模拟发货
                </el-button>
                <el-button
                  v-if="order.orderState === 3"
                  type="primary"
                  size="small"
                  @click="() => confirmorder(order.id)"
                >
                  确认收货
                </el-button>
                <p v-if="order.orderState === 1">
                  <el-button size="small" @click="() => cancel(order.id)">取消订单</el-button>
                </p>
                <p>
                  <RouterLink :to="`/order/${order.id}`" target="_blank">查看详情</RouterLink>
                  <a
                    href="javascript:;"
                    style="color: #999; margin-top: 3px"
                    @click="() => del(order.id)"
                    >删除</a
                  >
                </p>
              </div>
            </div>
          </div>
          <!-- 页码 -->
          <div class="pagination-container">
            <el-pagination
              :total="total"
              @current-change="pageChange"
              :current-page="params.page"
              :page-size="params.pageSize"
              background
              layout="prev, pager, next"
              v-if="orderList.length"
            />
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>
<style scoped lang="scss">
.order-container {
  padding: 10px 20px;
  .pagination-container {
    display: flex;
    justify-content: center;
  }
  .main-container {
    min-height: 500px;
    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        a {
          transition: all 0.1s;
          &:hover {
            color: $themeColor;
          }
        }
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                &.name {
                  margin-bottom: 5px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
      }
      &.amount {
        width: 200px;
        .red {
          color: $priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: $themeColor;
          }
        }
      }
    }
  }
}
</style>
