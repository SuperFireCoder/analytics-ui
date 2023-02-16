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
    <q-tab-panels v-model="currentTab" animated v-if="isDataLoaded">
      <q-tab-panel name="charts"><OverviewCharts /> </q-tab-panel>
      <q-tab-panel name="allUsers"><UserList /> </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import OverviewCharts from 'src/components/users/OverviewCharts.vue';
import UserList from 'src/components/users/UserList.vue';
import Users from 'src/models/Users';
import { useGlobalStore } from 'src/stores/global-store';
import { ref } from 'vue';
let currentTab = ref('charts');
// Fetch the data from the backend
const store = useGlobalStore();
store.setLoaderStatus({
  isLoading: true,
  text: 'Loading EcoCommons Data',
});
const user = new Users();
const isDataLoaded = ref(false);
//Wait for all promises to complete before closing the dialog
Promise.all([user.getAllUsers(), user.getNewUserTrendData()]).finally(() => {
  isDataLoaded.value = true;
  store.setLoaderStatus({
    isLoading: false,
    text: 'Loading EcoCommons users',
  });
});
</script>
