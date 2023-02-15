<template>
  <Line
    ref="chart"
    v-if="newUserTrend.isReady"
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  <q-card v-else flat class="q-pa-lg">
    <q-skeleton height="200px" square />
  </q-card>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chart = ref();

const userStore = useUsersStore();
const { newUserTrend } = storeToRefs(userStore);
console.log(newUserTrend.value);

let chartData = {
  labels: newUserTrend.value.labels,
  datasets: [
    {
      label: 'New Users',
      backgroundColor: '#f87979',
      data: newUserTrend.value.data,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
