import { NewUsersTrend } from './../interfaces/ICharts';
import IUsers from 'src/interfaces/IUser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('UsersStore', () => {
  const _allUsers = ref<IUsers[]>([]);
  const _newUserTrend = ref<NewUsersTrend>({
    data: [],
    labels: [],
    isReady: false,
  });

  const allUsers = computed(() => _allUsers.value);
  const newUserTrend = computed(() => _newUserTrend.value);

  const updateData = async (data: IUsers[]) => {
    _allUsers.value = data;
  };
  const updateNewUserTrendData = async (data: NewUsersTrend) => {
    _newUserTrend.value = data;
  };
  return { allUsers, newUserTrend, updateData, updateNewUserTrendData };
});
