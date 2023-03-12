import { boot } from 'quasar/wrappers';
import VueKeyCloakJs from '@dsb-norge/vue-keycloak-js';
import { api } from './axios';
import {
  VueKeycloakInstance,
  VueKeycloakOptions,
} from '@dsb-norge/vue-keycloak-js/dist/types';
import Keycloak from 'keycloak-js';

import { useGlobalStore } from 'src/stores/global-store';
// Allow usage of this.$keycloak in components
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}
const store = useGlobalStore();

const options: VueKeycloakOptions = {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'check-sso',
    // checkLoginIframe: false,
    // silentCheckSsoRedirectUri:
    //   window.location.origin + '/silent-check-sso.html',
  },
  config: {
    url: process.env.KEYCLOAK_SERVER_URL,
    clientId: process.env.KEYCLOAK_CLIENT_ID as string,
    realm: process.env.KEYCLOAK_REALM as string,
  },
  onAuthRefreshSuccess(keycloak: Keycloak) {
    updateTokenInterceptor(keycloak);
  },
  logout: {
    redirectUri: 'http://localhost:9000/login',
  },
  onReady(keycloak: Keycloak) {
    updateTokenInterceptor(keycloak);
  },
};
const updateTokenInterceptor = (keycloak: Keycloak) => {
  store.setLoginStatus(keycloak.authenticated);
  api.interceptors.request.use(
    (config) => {
      if (keycloak.authenticated) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default boot(async ({ app }) => {
  app.use(await VueKeyCloakJs, options);
  // Handle redirect to login page
});

export { api };
