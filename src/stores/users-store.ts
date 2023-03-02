import {
  ILoginActivity,
  IAppActivity,
  ISignUpActivity,
} from './../interfaces/ICharts';
import IUsers, {
  IUserDataBySector,
  IUserDataResponse,
} from 'src/interfaces/IUser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('UsersStore', () => {
  const _allUsers = ref<IUsers[]>([]);
  const _allUsersByGroups = ref<IUserDataBySector[]>([]);
  const _appActivity = ref<IAppActivity[]>([]);
  const _userActivity = ref<ILoginActivity>({
    count: [],
    time: [],
  });
  const _signUpActivity = ref<ISignUpActivity>({
    data: [],
    labels: [],
  });

  const allUsers = computed(() => _allUsers.value);
  const signUpActivity = computed(() => _signUpActivity.value);
  const allUsersBySector = computed(() => _allUsersByGroups.value);

  const userLoginActivity = computed(() => _userActivity.value);
  const appActivity = computed(() => _appActivity.value);

  const updateData = async (data: IUserDataResponse) => {
    _allUsers.value = data.users;
    _allUsersByGroups.value = data.userGrouped;
    _signUpActivity.value = data.signup;
    _userActivity.value = data.activity;
    _appActivity.value = data.appActivity;
  };

  return {
    allUsers,
    appActivity,
    signUpActivity,
    allUsersBySector,
    userLoginActivity,
    updateData,
  };
});
