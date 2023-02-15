import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import ILoaderStatus from 'src/interfaces/ILoaderStatus';

export const useGlobalStore = defineStore('GlobalStore', () => {
  const _loader = ref<ILoaderStatus>({
    isLoading: false,
    text: 'Please Wait...',
  });

  const loader = computed(() => _loader.value);

  const setLoaderStatus = async (status: ILoaderStatus) => {
    _loader.value = status;
  };
  return { loader, setLoaderStatus };
});
