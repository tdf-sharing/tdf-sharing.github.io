import { createRouter, createWebHashHistory } from 'vue-router';
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
      component: () => import('@/views/Main/Main-index.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/Home/Home-index.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/Category/Category-index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/SubCategory/SubCategory-index.vue')
        },
        {
          path: 'product/:id',
          component: () => import('@/views/Product/Product-index.vue')
        },
        {
          path: 'cartlist',
          component: () => import('@/views/CartList/CartList-index.vue')
        },
        {
          path: 'check',
          component: () => import('@/views/Check/Check-index.vue'),
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'pay',
          component: () => import('@/views/Pay/Pay-index.vue'),
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'paycallback',
          component: () => import('@/views/Pay/PayBack-index.vue'),
          beforeEnter: (to, _, next) => guard(to, next)
        },
        {
          path: 'user',
          component: () => import('@/views/User/User-index.vue'),
          beforeEnter: (to, _, next) => guard(to, next),
          children: [
            {
              path: '',
              component: () => import('@/views/User/components/Info-index.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/User/components/Order-index.vue')
            }
          ]
        },
        {
          path: 'order/:id',
          component: () => import('@/views/Order/Order-index.vue'),
          beforeEnter: (to, _, next) => guard(to, next)
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/Login-index.vue'),
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
