<template>
  <div class="q-pa-md">
    <q-table
      :loading="isUsersLoading"
      title="Platform Users"
      :rows="allUsers"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[10, 40, 100, 0]"
    >
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import IUsers from 'src/interfaces/IUser';
import Users from 'src/models/Users';
import { reactive, ref } from 'vue';

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    align: 'center',
    label: 'Keycloak ID',
    field: 'id',
    sortable: true,
  },
  // {
  //   name: 'username',
  //   align: 'center',
  //   label: 'Username',
  //   field: 'username',
  //   sortable: false,
  // },
  {
    name: 'firstName',
    align: 'center',
    label: 'First Name',
    field: 'firstName',
    sortable: true,
  },
  {
    name: 'lastName',
    align: 'center',
    label: 'Last Name',
    field: 'lastName',
    sortable: true,
  },
  {
    name: 'email',
    align: 'center',
    label: 'Email',
    field: 'email',
    sortable: false,
  },
  {
    name: 'providers',
    align: 'center',
    label: 'Providers',
    field: 'providers',
    sortable: true,
  },
  {
    name: 'created',
    align: 'center',
    label: 'Date Joined',
    field: 'created',
    sortable: true,
  },
];

let isUsersLoading = ref(true);
let allUsers: IUsers[] = reactive([]);
Users.getAllUsers()
  .then((response) => {
    Object.assign(allUsers, response);
  })
  .finally(() => {
    isUsersLoading.value = false;
  });
</script>
