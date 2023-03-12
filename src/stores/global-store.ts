import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import ILoaderStatus from 'src/interfaces/ILoaderStatus';

export const useGlobalStore = defineStore('GlobalStore', () => {
  const _loader = ref<ILoaderStatus>({
    isLoading: false,
    text: 'Please Wait...',
  });

  const _isLoggedIn = ref(false);
  const isLoggedIn = computed(() => _isLoggedIn.value);
  const setLoginStatus = (state: boolean | undefined) => {
    _isLoggedIn.value = state != undefined ? state : false;
  };
  // KC init
  const _isKeyCloakReady = ref(false);
  const isKeyCloakReady = computed(() => _isKeyCloakReady.value);
  const setKeyCloakReady = (state: boolean | undefined) => {
    _isKeyCloakReady.value = state != undefined ? state : false;
  };

  const loader = computed(() => _loader.value);

  const setLoaderStatus = async (status: ILoaderStatus) => {
    _loader.value = status;
  };
  return {
    loader,
    isLoggedIn,
    isKeyCloakReady,
    setKeyCloakReady,
    setLoaderStatus,
    setLoginStatus,
  };
});
