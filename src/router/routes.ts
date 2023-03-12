import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/users',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        component: () => import('pages/users/PlatformUsers.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
