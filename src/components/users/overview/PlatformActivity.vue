<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup lang="ts">
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
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
const { userLoginActivity } = storeToRefs(userStore);
/* Wanted this calc for backend but pandas is not behaving. */

const option = ref({
  title: {
    text: 'Platform Activity',
    subtext: 'Total number of KeyCloak requests per months made by users'
  },
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
    data: ['Platform Activity'],
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
    data: userLoginActivity.value.time,
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
      name: 'Platform Activity',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series',
      },
      data: userLoginActivity.value.count,
    },
  ],
});
</script>
