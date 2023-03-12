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
    // localStorage.setItem('isAuthenticated', state ? 'true' : 'false');
  };

  const loader = computed(() => _loader.value);

  const setLoaderStatus = async (status: ILoaderStatus) => {
    _loader.value = status;
  };
  return {
    loader,
    isLoggedIn,
    setLoaderStatus,
    setLoginStatus,
  };
});
