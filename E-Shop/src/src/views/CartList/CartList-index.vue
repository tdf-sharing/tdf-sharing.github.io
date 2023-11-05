<script setup>
import { UseCartStore } from '@/stores/cart.js';
import { ref } from 'vue';
const Cart = UseCartStore();
const min = 1;
const loading_flag = ref(true);
(async () => {
  await Cart.refresh();
  loading_flag.value = false;
})();
</script>
<template>
  <div class="cart-page">
    <div class="container" v-loading="loading_flag">
      <div class="cart">
        <table>
          <!-- 标题区 -->
          <thead>
            <tr>
              <th width="120">
                <el-checkbox :model-value="Cart.isselectedall" @change="Cart.select_all" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 商品区 -->
          <tbody>
            <tr v-for="i in Cart.cartlist" :key="i.id">
              <!-- 选择框 -->
              <td>
                <el-checkbox
                  :model-value="i.selected"
                  @change="(selected) => Cart.select_one(selected, i.skuId)"
                />
              </td>
              <!-- 商品信息 -->
              <td>
                <RouterLink :to="`/product/${i.id}`" class="goods" target="_blank"
                  ><img v-img-lazy="i.picture" alt="" />
                  <div style="margin-left: 15px">
                    <p class="ellipsis">
                      {{ i.name }}
                    </p>
                    <p style="font-size: 13px; color: #999" class="ellipsis">
                      {{ i.attrsText }}
                    </p>
                  </div></RouterLink
                >
              </td>
              <!-- 单价 -->
              <td class="tc">
                <p>￥{{ i.price }}</p>
              </td>
              <!-- 数量 -->
              <td class="tc">
                <el-input-number
                  v-model="i.count"
                  :min="min"
                  @change="
                    () => {
                      Cart.change_item(i);
                    }
                  "
                />
              </td>
              <!-- 小计 -->
              <td class="tc">
                <p class="f16 red">￥{{ (i.price * i.count).toFixed(2) }}</p>
              </td>
              <!-- 操作 -->
              <td class="tc">
                <p>
                  <el-popconfirm
                    title="确认删除吗?"
                    confirm-button-text="确认"
                    cancel-button-text="取消"
                    @confirm="Cart.delete_item(i.skuId)"
                  >
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <!-- 为空时显示 -->
            <tr v-if="!Cart.cartlist.length">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="购物车列表为空">
                    <RouterLink to="/"><el-button type="primary">随便逛逛</el-button></RouterLink>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action" v-if="Cart.cartlist.length">
        <div class="batch">
          已选择 {{ Cart.itemsum }} 件商品，
          <span style="font-weight: bold">合计：</span>
          <span class="red">¥ {{ Cart.allprice.toFixed(2) }} </span>
        </div>
        <div>
          <el-button
            size="large"
            type="primary"
            @click="$router.push('/check')"
            :disabled="Cart.itemsum ? false : true"
            >下单结算</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart-page {
  margin-top: 20px;
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
  .cart-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;
    p {
      color: #999;
      padding: 20px 0;
    }
  }
  .tc {
    text-align: center;
    a {
      color: $themeColor;
    }
  }
  .red {
    color: $priceColor;
  }
  .f16 {
    font-size: 16px;
  }
  .goods {
    display: flex;
    align-items: center;
    transition: all 0.1s;
    &:hover {
      color: $themeColor;
    }
    img {
      width: 100px;
      height: 100px;
    }
    div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;
    }
  }
  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;
    .batch {
      a {
        margin-left: 20px;
      }
    }
    .red {
      font-size: 16px;
      margin-right: 20px;
      font-weight: bold;
    }
  }
}
</style>
