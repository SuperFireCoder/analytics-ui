<template>
  <div class="q-pa-md">
    <q-tabs
      v-model="currentTab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="charts" label="Overview" />
      <q-tab name="allUsers" label="Platform Users" />
    </q-tabs>

    <q-separator />
    <q-tab-panels v-model="currentTab" animated>
      <q-tab-panel name="charts"><OverviewCharts /> </q-tab-panel>
      <q-tab-panel name="allUsers"><UserList /> </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import OverviewCharts from 'src/components/users/OverviewCharts.vue';
import UserList from 'src/components/users/UserList.vue';
import Users from 'src/models/Users';
import { ref } from 'vue';
let currentTab = ref('charts');
// Fetch the data from the backend
Users.getAllUsers();
</script>
