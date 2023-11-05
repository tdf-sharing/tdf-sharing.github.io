<script setup>
import { UseCategoryStore } from '@/stores/category.js';
const category = UseCategoryStore();
</script>
<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in category.listdata" :key="item.id">
        <!-- 类目 -->
        <RouterLink style="margin-left: 40px" :to="'/category/' + item.id">{{
          item.name
        }}</RouterLink>
        <RouterLink
          style="margin-left: 10px"
          v-for="son in item.children.slice(0, 1)"
          :key="son"
          :to="'/category/sub/' + son.id"
          >{{ son.name }}</RouterLink
        >
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐</h4>
          <ul>
            <li v-for="son in item.goods" :key="son">
              <RouterLink :to="`/product/${son.id}`">
                <img :src="son.picture" alt="" loading="eager" />
                <div class="info">
                  <p class="ellipsis-wrap">{{ son.name }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
$boxheight: #{calc(500 / 9)}px;
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.35);
  position: relative;
  z-index: 99;
  .menu {
    li {
      height: $boxheight;
      line-height: $boxheight;
      &:hover {
        background: $themeColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgb(255, 255, 255);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
        border-top: black solid 1px;
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 25px;
          font-weight: 600;
          line-height: 80px;
          margin-left: 10px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;
              transition: all ease-in-out 0.1s;
              color: #333;
              &:hover {
                color: $themeColor;
              }
              img {
                width: 95px;
                height: 95px;
                object-fit: cover;
                box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
                border-radius: 3px;
              }
              .info {
                padding-left: 20px;
                line-height: 24px;
                overflow: hidden;
                font-size: 14px;
              }
            }
          }
        }
      }
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
