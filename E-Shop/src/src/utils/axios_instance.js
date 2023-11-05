import axios from 'axios';
import axiosRetry from 'axios-retry';
import { UseMessage } from '@/composables/groupedmessage';
import { UseUserStore } from '@/stores/user.js';
import router from '@/router/index.js';
const instance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 0
});
axiosRetry(instance, {
  retries: 12,
  retryDelay: () => 5000
});
instance.interceptors.request.use(
  (config) => {
    let token;
    try {
      token = JSON.parse(localStorage.getItem('user')).userinfo.token;
    } catch {
      () => {};
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);
instance.interceptors.response.use(
  (res) => (res.data ? res.data : res),
  (e) => {
    UseMessage.warning(e.response.data?.message);
    if (e.response.status === 401) {
      UseUserStore().clear_user_info();
      router.replace('/login');
    }
    return Promise.reject(e);
  }
);
export default instance;
