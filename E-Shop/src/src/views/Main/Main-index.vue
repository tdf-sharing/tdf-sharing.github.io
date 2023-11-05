<script setup>
import LayoutNav from './components/Nav-index.vue';
import LayoutHeader from './components/Header-index.vue';
import LayoutFooter from './components/Footer-index.vue';
import { UseCategoryStore } from '@/stores/category.js';
UseCategoryStore().get_list();
</script>
<template>
  <LayoutNav />
  <LayoutHeader />
  <RouterView :key="$route.fullPath" />
  <LayoutFooter />
</template>
