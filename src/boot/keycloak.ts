// import { boot } from 'quasar/wrappers';
// import VueKeyCloakJs from '@dsb-norge/vue-keycloak-js';
// import { api } from './axios';
// import {
//   VueKeycloakInstance,
//   VueKeycloakOptions,
// } from '@dsb-norge/vue-keycloak-js/dist/types';
// import Keycloak from 'keycloak-js';

// import { useGlobalStore } from 'src/stores/global-store';
// // Allow usage of this.$keycloak in components
// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $keycloak: VueKeycloakInstance;
//   }
// }
// const store = useGlobalStore();

// const options: VueKeycloakOptions = {
//   init: {
//     // Use 'login-required' to always require authentication
//     // If using 'login-required', there is no need for the router guards in router.js
//     onLoad: 'check-sso',
//     redirectUri: 'http://localhost:9300'
//     // checkLoginIframe: false,
//     // silentCheckSsoRedirectUri:
//     //   window.location.origin + '/silent-check-sso.html',
//   },
//   config: {
//     url: process.env.KEYCLOAK_SERVER_URL,
//     clientId: process.env.KEYCLOAK_CLIENT_ID as string,
//     realm: process.env.KEYCLOAK_REALM as string,
//   },
//   onAuthRefreshSuccess(keycloak: Keycloak) {
//     updateTokenInterceptor(keycloak);
//   },
//   logout: {
//     redirectUri: process.env.APP_URL + '/login',
//   },
//   onReady(keycloak: Keycloak) {
//     store.setKeyCloakReady(true);
//     updateTokenInterceptor(keycloak);
//   },
//   onInitSuccess(
//     authenticated: boolean
//     // keycloak?: Keycloak,
//     // VueKeycloak?: VueKeycloakInstance
//   ) {
//     store.setLoginStatus(authenticated);
//   },
// };
// const updateTokenInterceptor = (keycloak: Keycloak) => {
//   api.interceptors.request.use(
//     (config) => {
//       if (keycloak.authenticated) {
//         config.headers.Authorization = `Bearer ${keycloak.token}`;
//         return config;
//       }
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };

// export default boot(async ({ app }) => {
//   store.setKeyCloakReady(false);
//   console.log('CONFIG', process.env.APP_URL)
//   app.use(await VueKeyCloakJs, options);
//   // Handle redirect to login page
// });

// export { api };
