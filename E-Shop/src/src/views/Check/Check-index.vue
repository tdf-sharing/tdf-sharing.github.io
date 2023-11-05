<script setup>
import {
  GetCheckInfoAPI,
  CreatePayOrderAPI,
  AddCheckAddressAPI,
  DelCheckAddressAPI
} from '@/apis/check&pay.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { UseCartStore } from '@/stores/cart.js';
import { UseMessage } from '@/composables/groupedmessage';
const cart = UseCartStore();
const router = useRouter();
const curAddress = ref({});
const checkInfo = ref({});
const loading_flag_1 = ref(true);
const loading_flag_2 = ref(false);
const getinfo = async () => {
  try {
    const res = await GetCheckInfoAPI();
    checkInfo.value = res.result;
    curAddress.value = checkInfo.value.userAddresses.find((item) => item.isDefault === 0);
  } catch {
    () => {};
  }
  loading_flag_1.value = false;
};
getinfo();
const showDialog = ref(false);
const activeadr = ref({});
const confirm = () => {
  if (Object.keys(activeadr.value).length) curAddress.value = activeadr.value;
  showDialog.value = false;
};
const submit = async () => {
  loading_flag_1.value = true;
  try {
    const res = await CreatePayOrderAPI({
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: '',
      goods: checkInfo.value.goods.map((item) => {
        return {
          skuId: item.skuId,
          count: item.count
        };
      }),
      addressId: curAddress.value.id
    });
    await cart.refresh();
    router.replace({
      path: '/pay',
      query: {
        id: res.result.id
      }
    });
  } catch {
    () => {};
  }
  loading_flag_1.value = false;
};
const deladdr = async (id) => {
  loading_flag_2.value = true;
  await DelCheckAddressAPI(id);
  activeadr.value = {};
  await getinfo();
  UseMessage.success('已删除');
  loading_flag_2.value = false;
};
const createaddr = async () => {
  loading_flag_2.value = true;
  try {
    await AddCheckAddressAPI({
      receiver: 'Demo',
      contact: 'XXXXXXXXXXX',
      provinceCode: '310000',
      cityCode: '310100',
      countyCode: '310110',
      address: 'XXX路XXX号',
      postalCode: 'XXXXXX',
      addressTags: '测试',
      isDefault: 0,
      fullLocation: '上海 上海市 杨浦区'
    });
    await getinfo();
    UseMessage.success('已添加 Demo 地址');
  } catch {
    () => {};
  }
  loading_flag_2.value = false;
};
</script>
<template>
  <div class="pay-checkout-page" v-loading.fullscreen.lock="loading_flag_1">
    <div class="container">
      <div class="wrapper">
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address">
            <div class="text" v-loading="loading_flag_2">
              <div class="none" v-if="!curAddress">请选择收货地址~</div>
              <ul v-else>
                <li>
                  <span>收<i />货<i />人：</span>{{ curAddress.receiver }}
                </li>
                <li><span>联系方式：</span>{{ curAddress.contact }}</li>
                <li>
                  <span>收货地址：</span>{{ curAddress.fullLocation }} {{ curAddress.address }}
                </li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="showDialog = true">切换地址</el-button>
              <el-button size="large" @click="createaddr">添加地址</el-button>
            </div>
          </div>
        </div>
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in checkInfo.goods" :key="i.id">
                <td>
                  <RouterLink class="info" :to="`/product/${i.id}`" target="_blank">
                    <img v-img-lazy="i.picture" alt="" />
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </RouterLink>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ i.totalPrice }}</td>
                <td>&yen;{{ i.totalPayPrice }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">不限送货时间：周一至周日</a>
        </div>
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a class="my-btn active" href="javascript:;">在线支付</a>
        </div>
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ checkInfo.summary?.goodsCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>￥{{ checkInfo.summary?.totalPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>￥{{ checkInfo.summary?.postFee.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">￥{{ checkInfo.summary?.totalPayPrice.toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button
            type="primary"
            size="large"
            @click="submit"
            :disabled="curAddress ? false : true"
            >提交订单</el-button
          >
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址弹窗 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper" v-loading="loading_flag_2">
      <div
        v-if="!checkInfo.userAddresses?.length"
        style="text-align: center; color: #999; padding: 15px 0 35px 0"
      >
        空空如也，去添加一个吧~
      </div>
      <div
        style="display: flex; justify-content: space-between; cursor: default"
        class="text item"
        :class="{ active: activeadr.id === item.id }"
        v-for="item in checkInfo.userAddresses"
        :key="item.id"
        @click="() => (activeadr = item)"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>
          <li><span>联系方式：</span>{{ item.contact }}</li>
          <li><span>收货地址：</span>{{ item.fullLocation + item.address }}</li>
        </ul>
        <span
          style="color: #999; margin-right: 15px; cursor: pointer"
          @click="
            () => {
              deladdr(item.id);
            }
          "
          >删除</span
        >
      </div>
    </div>
    <template #footer v-if="checkInfo.userAddresses?.length">
      <span>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss">
.pay-checkout-page {
  margin-top: 20px;
  .wrapper {
    background: #fff;
    padding: 0 20px;
    .box-title {
      font-size: 20px;
      font-weight: 600;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }
    .box-body {
      padding: 20px 0;
    }
  }
}
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: $themeColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 250px;
    text-align: center;
  }
}
.goods {
  width: 100%;
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
.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;
  &.active,
  &:hover {
    border-color: $themeColor;
  }
}
.total {
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
.submit {
  text-align: right;
  padding: 65px;
  padding-top: 15px;
  border-top: 1px solid #f5f5f5;
}
.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}
.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;
  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;
    &.active,
    &:hover {
      border-color: $themeColor;
      background: lighten($themeColor, 50%);
    }
    > ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
