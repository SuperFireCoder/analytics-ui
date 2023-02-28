import { UserDataBySector } from './../interfaces/IUser';
import {
  NewUsersTrend,
  ITrend,
  ILoginActivity,
  IAppActivity,
} from './../interfaces/ICharts';
import IUsers, { AllUserResponse } from 'src/interfaces/IUser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('UsersStore', () => {
  const _allUsers = ref<IUsers[]>([]);
  const _allUsersByGroups = ref<UserDataBySector[]>([]);
  const _appActivity = ref<IAppActivity[]>([]);
  const _userActivity = ref<ILoginActivity>({
    count: [],
    time: [],
  });
  const _newUserTrend = ref<NewUsersTrend>({
    data: [],
    labels: [],
    isReady: false,
  });

  const allUsers = computed(() => _allUsers.value);
  const newUserTrend = computed(() => _newUserTrend.value);
  const allUsersBySector = computed(() => _allUsersByGroups.value);

  const userLoginActivity = computed(() => _userActivity.value);
  const appActivity = computed(() => _appActivity.value);

  const updateData = async (data: AllUserResponse) => {
    _allUsers.value = data.users;
    _allUsersByGroups.value = data.userGrouped;
  };
  const updateNewUserTrendData = async (data: ITrend) => {
    _newUserTrend.value = data.signup;
    _userActivity.value = data.activity;
    _appActivity.value = data.appActivity;
  };
  return {
    allUsers,
    appActivity,
    newUserTrend,
    allUsersBySector,
    userLoginActivity,
    updateData,
    updateNewUserTrendData,
  };
});
