<script setup>
import { UseCartStore } from '@/stores/cart.js';
import { useMouseInElement } from '@vueuse/core';
import { ref, watch } from 'vue';
const target_1 = ref(null);
const target_2 = ref(null);
const { isOutside: t1 } = useMouseInElement(target_1);
const { isOutside: t2 } = useMouseInElement(target_2);
let flag_1 = false;
let flag_2 = true;
let timer_1;
let timer_2;
/* 决定是否显示购物车的隐藏层 */
function cartmove(tof) {
  if (tof) {
    if (timer_2) {
      clearTimeout(timer_2);
      timer_2 = undefined;
    }
    if (!(timer_1 || flag_1)) {
      timer_1 = setTimeout(() => {
        target_2.value.style.opacity = '1';
        target_2.value.style.height = '400px';
        flag_1 = true;
        flag_2 = false;
      }, 150);
    }
  } else {
    if (timer_1) {
      clearTimeout(timer_1);
      timer_1 = undefined;
    }
    if (!(timer_2 || flag_2)) {
      timer_2 = setTimeout(() => {
        target_2.value.style.opacity = '0';
        target_2.value.style.height = '0';
        flag_2 = true;
        flag_1 = false;
      }, 250);
    }
  }
}
watch([t1, t2], () => {
  cartmove(!t1.value || !t2.value);
});
const Cart = UseCartStore();
</script>
<template>
  <div class="cart" ref="target_1">
    <!-- 小图标 -->
    <a class="curr" href="javascript:;">
      <i class="iconfont icon-cart"></i
      ><em>{{ Cart.cartlist.length <= 9 ? Cart.cartlist.length : '9+' }}</em>
    </a>
    <!-- 隐藏层 -->
    <div class="layer" ref="target_2">
      <div class="ent"></div>
      <div style="height: 400px">
        <!-- 购物车列表 -->
        <div class="list">
          <div v-if="!Cart.cartlist.length" style="position: absolute; top: 185px; left: 130px">
            暂无内容，再逛逛吧~
          </div>
          <div v-else class="item" v-for="i in Cart.cartlist" :key="i.skuId">
            <RouterLink :to="`/product/${i.id}`">
              <img :src="i.picture" alt="" loading="lazy" />
              <div class="center">
                <p class="name ellipsis-wrap">
                  {{ i.name }}
                </p>
                <p class="attr ellipsis">{{ i.attrsText }}</p>
              </div>
              <div class="right">
                <p class="price ellipsis">&yen;{{ i.price }}</p>
                <p class="count">x{{ i.count }}</p>
              </div>
            </RouterLink>
            <i class="iconfont icon-close-new" @click="Cart.delete_item(i.skuId)"></i>
          </div>
        </div>
      </div>
      <el-button
        v-if="Cart.cartlist.length"
        size="large"
        type="primary"
        class="button"
        @click="$router.push('/cartlist')"
        >去购物车结算</el-button
      >
    </div>
  </div>
</template>
<style scoped lang="scss">
.cart {
  width: 50px;
  position: relative;
  z-index: 600;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    em {
      font-style: normal;
      position: absolute;
      right: 0;
      top: 0;
      padding: 1px 6px;
      line-height: 1;
      background: $themeColor;
      color: #fff;
      font-size: 12px;
      border-radius: 10px;
      font-family: Arial;
    }
  }
  .layer {
    overflow: hidden;
    opacity: 0;
    transition: all 0.25s;
    width: 400px;
    height: 0px;
    position: absolute;
    top: 40px;
    right: 0;
    box-shadow: 2.5px 2.5px 25px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 8px;
    .ent {
      position: absolute;
      top: 0px;
      right: 12px;
      display: block;
      background-color: $themeColor;
      height: 3px;
      width: 25px;
      border-radius: 100px;
    }
    .button {
      position: absolute;
      bottom: 15px;
      left: 132px;
      box-shadow: 3px 3px 12px rgba(0, 0, 0, 0.2);
    }
  }
  .list {
    height: 100%;
    overflow: auto;
    padding: 10px;
    padding-top: 18px;
    padding-bottom: 60px;
    .item {
      padding: 10px 0;
      position: relative;
      i {
        position: absolute;
        bottom: 38px;
        right: 0;
        opacity: 0;
        color: #666;
        transition: all 0.3s;
      }
      &:hover {
        i {
          opacity: 1;
          cursor: pointer;
        }
      }
      a {
        display: flex;
        align-items: center;
        justify-content: space-around;
        transition: all 0.1s;
        &:hover {
          color: $themeColor;
        }
        img {
          height: 80px;
          width: 80px;
          margin-left: 15px;
          border-radius: 4px;
        }
        .center {
          padding-left: 10px;
          width: 170px;
          font-size: 12px;
          .name {
            font-size: 14px;
          }
          .attr {
            color: #999;
            padding-top: 5px;
          }
        }
        .right {
          width: 100px;
          padding-right: 20px;
          text-align: center;
          .price {
            font-size: 14px;
            font-weight: 600;
            color: $priceColor;
          }
          .count {
            color: #999;
            margin-top: 5px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
