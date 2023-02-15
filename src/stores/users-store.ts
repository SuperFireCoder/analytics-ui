import IUsers from 'src/interfaces/IUser';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUsersStore = defineStore('UsersStore', () => {
  const _allUsers = ref<IUsers[]>([]);

  const allUsers = computed(() => _allUsers.value);

  const updateData = async (data: IUsers[]) => {
    _allUsers.value = data;
  };
  return { allUsers, updateData };
});
