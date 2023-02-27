<template>
  <q-splitter v-model="splitterModel">
    <template v-slot:before>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        vertical
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel name="growth" style="height: 50vh">
          <UserSubscriptionTrend />
        </q-tab-panel>

        <q-tab-panel name="demographics" style="height: 50vh">
          <UserType />
        </q-tab-panel>

        <q-tab-panel name="platActivity" style="height: 50vh">
          <PlatformActivity />
        </q-tab-panel>
      </q-tab-panels>
    </template>
    <template v-slot:after>
      <q-tabs v-model="tab" vertical class="text-teal">
        <q-tab
          name="growth"
          icon="fa-solid fa-arrow-up-right-dots"
          label="Growth Trend"
        />
        <q-tab name="demographics" icon="alarm" label="Demographics" />
        <q-tab name="platActivity" icon="movie" label="Platform Activity" />
        <q-tab name="appActivity" icon="movie" label="App Activity" />
      </q-tabs>
    </template>
    <div class="row" justify-center>
      <div class="col" style="height: 50vh"></div>
      <div class="col-4"></div>
    </div>
    <div class="row">
      <div class="col"></div>
    </div>
  </q-splitter>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import UserSubscriptionTrend from './UserSubscriptionTrend.vue';
import PlatformActivity from './PlatformActivity.vue';
import UserType from './UserType.vue';

const splitterModel = ref(80);
const tab = ref('growth');
</script>
