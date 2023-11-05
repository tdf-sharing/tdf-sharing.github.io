<script setup>
import { GetProductInfoAPI } from '@/apis/product';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import HotList from './components/Hot-index.vue';
import Image from './components/Image-index.vue';
import Sku from './components/Sku-index.vue';
import { UseMessage } from '@/composables/groupedmessage';
import { UseCartStore } from '@/stores/cart.js';
const Cart = UseCartStore();
const goods = ref({});
const route = useRoute();
const loading_flag = ref(true);
const count = ref(1);
let item = {};
const getGoods = async () => {
  try {
    const res = await GetProductInfoAPI(route.params.id);
    goods.value = res.result;
  } catch {
    () => {};
  }
  loading_flag.value = false;
};
getGoods();
const getsku = (sku) => {
  item = sku;
  if (item.skuId) {
    goods.value.oldPrice = sku.oldPrice;
    goods.value.price = sku.price;
  }
};
const addToCart = () => {
  if (item.skuId) {
    Cart.add_item({
      id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: item.skuId,
      attrsText: item.specsText,
      selected: true
    });
    UseMessage.success('已加入购物车');
  } else {
    UseMessage.warning('请选择商品规格');
  }
};
</script>
<template>
  <div class="goods-page" v-loading.fullscreen.lock="loading_flag">
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.categories[1].name }} </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }"
            >{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div>
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->
              <Image :imageList="goods.mainPictures.filter((x) => x)"></Image>
              <!-- 图底信息区 -->
              <ul class="goods-sales">
                <li>
                  <p>销量</p>
                  <p style="font-weight: 600">{{ goods.salesCount }}+</p>
                  <p style="cursor: default"><i class="iconfont icon-task-filling"></i>爆品尖货</p>
                </li>
                <li>
                  <p>折扣</p>
                  <p style="font-weight: 600">
                    {{ goods.discount == 1 ? '- 暂无 -' : `${(goods.discount * 10).toFixed(1)}折` }}
                  </p>
                  <p style="cursor: default">
                    <i class="iconfont icon-favorite-filling"></i>大额优惠
                  </p>
                </li>
              </ul>
            </div>
            <!-- 商品信息区 -->
            <div class="spec">
              <p class="g-name">{{ goods.name }}</p>
              <p class="g-desc">{{ goods.desc }}</p>
              <p class="g-price">
                <span>￥{{ goods.price }}</span>
                <span> {{ goods.discount == 1 ? '' : '￥' + goods.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，最高直降1000元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>七天无理由退货</span>
                    <span>专人售后</span>
                    <span>运费险</span>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->
              <Sku :goods="goods" @change="getsku" />
              <!-- 数量组件 -->
              <span style="color: #999; display: inline-block; width: 50px; margin-left: 10px"
                >数量</span
              >
              <el-input-number v-model="count" :min="1" @change="(e) => (count = e)" size="small" />
              <!-- 按钮组件 -->
              <div>
                <el-button type="primary" size="large" class="btn" @click="addToCart">
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" v-img-lazy="img" :key="img" alt="" />
                </div>
              </div>
            </div>
            <div class="goods-aside">
              <!-- 24小时热榜 -->
              <HotList :type="1" />
              <!-- 周热榜 -->
              <HotList :type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.goods-page {
  min-height: 600px;
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    .media {
      width: 580px;
      height: 600px;
      padding: 50px 55px;
    }
    .spec {
      flex: 1;
      padding: 50px 30px 30px 15px;
    }
  }
  .goods-footer {
    display: flex;
    margin-top: 20px;
    .goods-article {
      width: 940px;
      margin-right: 20px;
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }
  .g-name {
    font-size: 26px;
    font-weight: 600;
  }
  .g-desc {
    color: #999;
    font-size: 14px;
    margin-top: 10px;
  }
  .g-price {
    margin-top: 10px;
    span {
      &::before {
        font-size: 14px;
      }
      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
        font-weight: 600;
      }
      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }
  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;
    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      dt {
        width: 50px;
        color: #999;
      }
      dd {
        color: #666;
        &:last-child {
          span {
            margin-right: 10px;
            &::before {
              content: '•';
              color: $themeColor;
              margin-right: 2px;
            }
          }
          a {
            color: $themeColor;
          }
        }
      }
    }
  }
  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;
    li {
      flex: 1;
      position: relative;
      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
      }
      p {
        &:first-child {
          color: #999;
        }
        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }
        &:last-child {
          color: #666;
          margin-top: 10px;
          i {
            color: $themeColor;
            font-size: 14px;
            margin-right: 2px;
          }
          &:hover {
            color: $themeColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}
.goods-detail {
  padding: 40px;
  padding-bottom: 0;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: calc(50% - 25px);
      margin-right: 25px;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    margin: 0 -40px;
    width: calc(100% + 80px);
    max-width: calc(100% + 80px);
  }
}
.btn {
  margin-top: 20px;
  margin-left: 10px;
}
.bread-container {
  padding: 25px 0;
}
</style>
