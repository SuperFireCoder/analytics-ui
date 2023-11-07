import { storeToRefs } from 'pinia';
import { route } from 'quasar/wrappers';
import { useGlobalStore } from 'src/stores/global-store';
import { watch } from 'vue';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  const store = useGlobalStore();
  const { isLoggedIn, isKeyCloakReady } = storeToRefs(store);

  watch(isLoggedIn, () => {
    if (Router.currentRoute.value.path == '/login') Router.push('/');
  });

  Router.beforeEach((to, from, next) => {
    console.log(isKeyCloakReady.value);
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !isLoggedIn.value
    ) {
      next('/login');
    } else if (to.path == '/login' && isLoggedIn.value == true) {
      next('/');
    } else {
      next();
    }
  });

  return Router;
});
