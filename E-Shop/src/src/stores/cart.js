import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { UseUserStore } from './user.js';
import {
  AddCartItemAPI,
  GetCartListAPI,
  DelCartItemAPI,
  ChangeCartItemAPI,
  MergeCartAPI
} from '@/apis/cart.js';
export const UseCartStore = defineStore(
  'cart',
  () => {
    const cartlist = ref([]);
    const islogin = computed(() => UseUserStore().userinfo.token);
    const refresh = async () => {
      if (islogin.value) {
        const res = await GetCartListAPI();
        cartlist.value = res.result;
      }
    };
    const change_item = async ({ skuId, selected, count }) => {
      if (islogin.value) {
        await ChangeCartItemAPI({
          skuId,
          selected,
          count
        });
      }
    };
    const add_item = async (item) => {
      if (islogin.value) {
        await AddCartItemAPI({
          skuId: item.skuId,
          count: item.count
        });
      }
      const tmp = cartlist.value.find((i) => i.skuId === item.skuId);
      if (tmp) {
        tmp.count += item.count;
      } else {
        cartlist.value.push(item);
      }
    };
    const delete_item = async (skuId) => {
      if (islogin.value) {
        await DelCartItemAPI([skuId]);
      }
      const tmp = cartlist.value.findIndex((i) => i.skuId === skuId);
      cartlist.value.splice(tmp, 1);
    };
    const clear_cart = () => {
      cartlist.value = [];
    };
    const select_one = async (selected, skuId) => {
      const tmp = cartlist.value.find((i) => i.skuId === skuId);
      tmp.selected = selected;
      await change_item(tmp);
    };
    const select_all = async (selected) => {
      cartlist.value.forEach(async (item) => await select_one(selected, item.skuId));
    };
    const merge_cart = async () => {
      await MergeCartAPI(
        cartlist.value.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          };
        })
      );
      await refresh();
    };
    const isselectedall = computed(() => {
      if (!cartlist.value.length) return false;
      else return cartlist.value.every((item) => item.selected);
    });
    const itemsum = computed(() =>
      cartlist.value.reduce((total, item) => {
        if (item.selected) return total + item.count;
        return total;
      }, 0)
    );
    const allprice = computed(() =>
      cartlist.value.reduce((total, item) => {
        if (item.selected) return total + item.count * item.price;
        return total;
      }, 0)
    );
    return {
      cartlist,
      refresh,
      change_item,
      add_item,
      delete_item,
      select_one,
      select_all,
      clear_cart,
      merge_cart,
      isselectedall,
      itemsum,
      allprice
    };
  },
  {
    persist: {
      paths: ['cartlist']
    }
  }
);
