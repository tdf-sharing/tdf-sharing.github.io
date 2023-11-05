import { ref } from 'vue';
import { defineStore } from 'pinia';
import { GetCategoryListAPI } from '@/apis/category.js';
export const UseCategoryStore = defineStore('category', () => {
  const listdata = ref([]);
  const get_list = async () => {
    listdata.value = (await GetCategoryListAPI()).result;
  };
  return {
    listdata,
    get_list
  };
});
