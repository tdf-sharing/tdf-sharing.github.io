<script setup>
import { GetHomeBannerAPI } from '@/apis/home.js';
import { ref } from 'vue';
import CT from 'colorthief';
const loading_flag = ref(true);
const ct = new CT();
const imgs = ref(null);
const left = ref(null);
const bannerList = ref([]);
(async () => {
  const res = await GetHomeBannerAPI();
  bannerList.value = res.result;
  loading_flag.value = false;
})();
function change(params) {
  const color = ct.getColor(imgs.value[params]);
  left.value.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
}
const tmp_timer = setInterval(() => {
  try {
    change(0);
    clearInterval(tmp_timer);
  } catch {
    () => {};
  }
});
</script>
<template>
  <!-- 左侧背景颜色区 -->
  <div class="left" ref="left"></div>
  <!-- 轮播图 -->
  <div class="home-banner" v-loading="loading_flag">
    <el-carousel height="500px" @change="change">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <RouterLink :to="item.hrefUrl"
          ><img :src="item.imgUrl" alt="" ref="imgs" crossorigin="anonymous"
        /></RouterLink>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped lang="scss">
.left {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 500px;
  background-color: #666;
  transition: all ease-in-out 0.5s;
}
.home-banner {
  width: 990px;
  height: 500px;
  z-index: 98;
  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
  }
}
</style>
