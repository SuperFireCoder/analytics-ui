// import { storeToRefs } from 'pinia';
import { route } from 'quasar/wrappers';
// import { useGlobalStore } from 'src/stores/global-store';
// import { watch } from 'vue';
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
  // const store = useGlobalStore();
  // const { isLoggedIn, isKeyCloakReady } = storeToRefs(store);

  // const checkRouteAuth = (route) => {
  //   if (!route) return false; // Return false if route is null or undefined
  //   if (route.meta?.requiresAuth) return true; // Check if route requires authentication
  //   return route.matched.some((record) => checkRouteAuth(record.parent)); // Recursively check parent routes

  // };
  // watch(isLoggedIn, () => {
  //   if (Router.currentRoute.value.path == '/login') Router.push('/');
  // });

  Router.beforeEach((to, from, next) => {
    // console.log(isKeyCloakReady.value);
    // console.log(to.fullPath);
    // const requiresAuth = false;
    // // const requiresAuth = checkRouteAuth(to);
    // const isLoginRoute = to.path === '/login';

    // Handle login route
    // if (isLoginRoute) {
    //   if (isLoggedIn.value) {
    //     next('/'); // If already logged in, redirect to home
    //   } else {
    //     // Here you can access query parameters like to.query.error
    //     // Handle login logic here, possibly using to.query.error
    //     next(); // Proceed to login route
    //   }
    // }
    // // Handle other routes requiring authentication
    // else if (requiresAuth && !isLoggedIn.value) {
    //   next('/login'); // Redirect to login if not authenticated
    // } else {
    next(); // Proceed to the requested route
    // }
  });

  return Router;
});
