<template>
  <q-splitter v-model="splitterModel">
    <template v-slot:before>
      <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
        <q-tab-panel name="growth" style="height: 50vh">
          <UserSignUpActivity />
        </q-tab-panel>

        <q-tab-panel name="demographics" class="q-gutter-y-lg">

          <div class="row" style="height: 50vh">
            <UserDemographics class="col" />
          </div>


          <div class="row">
            <div class="col">
              <q-markup-table separator="horizontal" flat bordered>
                <thead>
                  <tr class="bg-grey-9 text-white text-subtitle2">
                    <th class="text-left ">Sector</th>
                    <th class="text-center">Breakdown</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="userBySector, name in allUsersBySector" :key="name">
                    <td class="text-center bg-grey-1">{{ name }}</td>
                    <td class="text-left">
                      <q-markup-table bordered flat>
                        <thead>
                          <tr>
                            <th class="text-center">Sector</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Country</th>
                          </tr>
                        </thead>
                <tbody>
                  <tr v-for="user in userBySector" :key="user">
                    <td class="text-center">{{ user.name }}</td>
                    <td class="text-center">{{ user.value }}</td>
                    <td class="text-center">{{ user.country }}</td>

                  </tr>
                </tbody>
              </q-markup-table></td>

              </tr>
              </tbody>
              </q-markup-table>
            </div>

          </div>

        </q-tab-panel>

        <q-tab-panel name="platActivity">
          <div class="row" style="height: 50vh">
            <PlatformActivity />
          </div>
          <div class="text-subtitle">
            NOTE: This graph represents individual KeyCloak requests over the
            period of time. With implementation of our microservices architecture
            actions on the platform frequently require multiple requests to the
            KeyCloak server. This graph does not represent the number of actions
            taken on the platform.

          </div>
        </q-tab-panel>
        <q-tab-panel name="appActivity" style="height: 70vh">
          <ApplicationUsage />
        </q-tab-panel>
        <q-tab-panel name="activeUsers">
          <div class="row" style="height:300px">
            <ThreeMonthUsers />
          </div>
        </q-tab-panel>

      </q-tab-panels>

    </template>
    <template v-slot:after>
      <q-tabs v-model="tab" vertical class="text-teal">
        <q-tab name="growth" icon="fa-solid fa-arrow-up-right-dots" label="Growth Trend" />
        <q-tab name="activeUsers" icon="fas fa-users" label="Active Users" />
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
import UserSignUpActivity from './UserSignUpActivity.vue';
import PlatformActivity from './PlatformActivity.vue';
import UserDemographics from './UserDemographics.vue';
import ApplicationUsage from './ApplicationUsage.vue';
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';

import ThreeMonthUsers from '../overview/ThreeMonthUsers.vue';
const userStore = useUsersStore();
const { allUsersBySector } = storeToRefs(userStore);

const splitterModel = ref(80);
const tab = ref('growth');
</script>
