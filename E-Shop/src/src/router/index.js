import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/views/Login/Login-index.vue';
import Main from '@/views/Main/Main-index.vue';
import Home from '@/views/Home/Home-index.vue';
import Category from '@/views/Category/Category-index.vue';
import SubCategory from '@/views/SubCategory/SubCategory-index.vue';
import Product from '@/views/Product/Product-index.vue';
import CartList from '@/views/CartList/CartList-index.vue';
import Check from '@/views/Check/Check-index.vue';
import Pay from '@/views/Pay/Pay-index.vue';
import Payback from '@/views/Pay/PayBack-index.vue';
import OrderDetail from '@/views/Order/Order-index.vue';
import User from '@/views/User/User-index.vue';
import UserInfo from '@/views/User/components/Info-index.vue';
import UserOrder from '@/views/User/components/Order-index.vue';
import { UseMessage } from '@/composables/groupedmessage';
import { UseBusStore } from '@/stores/bus.js';
import { UseUserStore } from '@/stores/user.js';
function guard(to, next) {
  if (UseUserStore().userinfo.token) next();
  else {
    UseBusStore().set_towhere(to);
    router.replace('/login');
    UseMessage.warning('请先登录');
  }
}
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: Main,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'product/:id',
          component: Product
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'check',
          component: Check,
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'pay',
          component: Pay,
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'paycallback',
          component: Payback,
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'user',
          component: User,
          beforeEnter: (to, _, next) => guard(to, next),
          children: [
            {
              path: '',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        },
        {
          path: 'order/:id',
          component: OrderDetail,
          beforeEnter: (to, _, next) => guard(to, next)
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!UseUserStore().userinfo.token) next();
        else router.replace('/');
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    };
  }
});
export default router;
