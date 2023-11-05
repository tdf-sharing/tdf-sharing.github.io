import { ref } from 'vue';
import { defineStore } from 'pinia';
import { UserLoginAPI } from '@/apis/user.js';
import { UseCartStore } from '@/stores/cart.js';
export const UseUserStore = defineStore(
  'user',
  () => {
    const cart = UseCartStore();
    const userinfo = ref({});
    const get_user_info = async ({ account, password }) => {
      const res = await UserLoginAPI({
        account,
        password
      });
      userinfo.value = res.result;
      await cart.merge_cart();
    };
    const clear_user_info = () => {
      userinfo.value = {};
      cart.clear_cart();
    };
    return {
      userinfo,
      get_user_info,
      clear_user_info
    };
  },
  {
    persist: {
      paths: ['userinfo']
    }
  }
);
