<script setup>
import Category from './components/Category-index.vue';
import Banner from './components/Banner-index.vue';
import New from './components/New-index.vue';
import Hot from './components/Hot-index.vue';
import List from './components/List-index.vue';
</script>
<template>
  <div style="background-color: #fff">
    <div class="container">
      <Category />
      <Banner />
    </div>
  </div>
  <New />
  <List />
  <Hot />
</template>
<style scoped lang="scss">
.container {
  display: flex;
}
</style>
