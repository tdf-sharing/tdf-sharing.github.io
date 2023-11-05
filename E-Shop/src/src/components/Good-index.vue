<script setup>
import CT from 'colorthief';
import { ref } from 'vue';
defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
});
const ct = new CT();
const img = ref(null);
const outerbox = ref(null);
function setbgc() {
  const color = ct.getColor(img.value, 100);
  const transp = ((color[0] + color[1] + color[2]) / 765) * 0.2;
  outerbox.value.style.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},${transp})`;
}
const keepset = setInterval(() => {
  try {
    setbgc();
    clearInterval(keepset);
  } catch {
    () => {};
  }
});
</script>
<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <div ref="outerbox">
      <div class="img_container img-loading">
        <img v-img-lazy="goods.picture" alt="" ref="img" crossorigin="anonymous" />
      </div>
      <p class="name ellipsis">{{ goods.name }}</p>
      <p class="price ellipsis">￥{{ goods.price }}</p>
    </div>
  </RouterLink>
</template>
<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  height: 275px;
  background-color: transparent;
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    transform: translate3d(0, -3px, 0);
  }
  div {
    height: 100%;
    background-color: #f5f5f5;
    transition: all ease-in-out 0.5s;
  }
  img,
  .img_container {
    width: 220px;
    height: 200px;
    object-position: bottom;
    object-fit: cover;
    background-color: #f2f2f2;
  }
  .name {
    padding: 0 35px;
    padding-top: 10px;
    font-size: 16px;
  }
  .price {
    padding: 7px 55px 0 55px;
    color: $priceColor;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>
