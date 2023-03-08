import { boot } from 'quasar/wrappers';
import VueKeyCloakJs from '@dsb-norge/vue-keycloak-js';
import { api } from './axios';
import {
  VueKeycloakInstance,
  VueKeycloakOptions,
} from '@dsb-norge/vue-keycloak-js/dist/types';
import Keycloak from 'keycloak-js';
// Allow usage of this.$keycloak in components
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: VueKeycloakInstance;
  }
}

const options: VueKeycloakOptions = {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'login-required',
    checkLoginIframe: false,
    // silentCheckSsoRedirectUri:
    //   window.location.origin + '/silent-check-sso.html',
  },
  config: {
    url: process.env.KEYCLOAK_SERVER_URL,
    clientId: process.env.KEYCLOAK_CLIENT_ID as string,
    realm: process.env.KEYCLOAK_REALM as string,
  },
  onReady(keycloak: Keycloak) {
    console.log('Keycloak ready', keycloak);
    api.interceptors.request.use((config) => {
      if (keycloak.authenticated) {
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
      }
    });
  },
};

export default boot(async ({ app }) => {
  app.use(await VueKeyCloakJs, options);
});

export { api };
