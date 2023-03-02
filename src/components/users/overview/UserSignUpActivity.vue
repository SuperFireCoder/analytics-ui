<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import VChart from 'vue-echarts';

import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';

use([
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  GridComponent,
]);

const userStore = useUsersStore();
const { signUpActivity } = storeToRefs(userStore);
/* Wanted this calc for backend but pandas is not behaving. */
const growthOverTime = computed((): number[] => {
  let data: number[] = [];
  let total = 0;
  signUpActivity.value.data.forEach((item) => {
    total += item;
    data.push(total);
  });
  return data;
});
const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['New Users', 'User Growth'],
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },

  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: signUpActivity.value.labels,
  },
  yAxis: {
    type: 'value',
  },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: 0,
      minSpan: 5,
    },
    {
      type: 'slider',
      xAxisIndex: 0,
      minSpan: 5,
      bottom: 20,
    },
  ],
  series: [
    {
      name: 'New Users',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      // itemStyle: {
      //   color: 'rgb(255, 70, 131)',
      // },
      // areaStyle: {
      //   color: 'rgb(243, 243, 243)',
      // },
      data: signUpActivity.value.data,
    },
    {
      name: 'User Growth',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      // itemStyle: {
      //   color: 'rgb(255, 70, 131)',
      // },
      // areaStyle: {
      //   color: 'rgb(243, 243, 243)',
      // },
      data: growthOverTime,
    },
  ],
});
</script>
