<template>
  <div class="row">
    <div class="col">
      <q-table
        flat
        bordered
        class="my-sticky-header-table"
        title="Platform Users"
        :rows="allUsers"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 40, 100, 0]"
      >
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';

const columns: QTableProps['columns'] = [
  // {
  //   name: 'id',
  //   align: 'center',
  //   label: 'Keycloak ID',
  //   field: 'id',
  //   sortable: true,
  // },
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
const userStore = useUsersStore();

const { allUsers } = storeToRefs(userStore);
console;
</script>
