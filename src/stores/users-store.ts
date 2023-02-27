import { UserDataBySector } from './../interfaces/IUser';
import { NewUsersTrend } from './../interfaces/ICharts';
import IUsers, { AllUserResponse } from 'src/interfaces/IUser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('UsersStore', () => {
  const _allUsers = ref<IUsers[]>([]);
  const _allUsersByGroups = ref<UserDataBySector[]>([]);
  const _newUserTrend = ref<NewUsersTrend>({
    data: [],
    labels: [],
    isReady: false,
  });

  const allUsers = computed(() => _allUsers.value);
  const newUserTrend = computed(() => _newUserTrend.value);
  const allUsersBySector = computed(() => _allUsersByGroups.value);

  const updateData = async (data: AllUserResponse) => {
    _allUsers.value = data.users;
    _allUsersByGroups.value = data.userGrouped;
  };
  const updateNewUserTrendData = async (data: NewUsersTrend) => {
    _newUserTrend.value = data;
  };
  return {
    allUsers,
    newUserTrend,
    allUsersBySector,
    updateData,
    updateNewUserTrendData,
  };
});
