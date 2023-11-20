<script setup lang="ts">
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { ref } from 'vue'
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
const { userThreeMonthsActivity } = storeToRefs(userStore);
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
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  GridComponent,

]);
const option = ref({
  title: {
    text: '90 Days Active Users',
    subtext: 'Number of users identified by their unique login each month'
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
    data: ['Three Months Active Users'],
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
    data: Object.values(userThreeMonthsActivity.value).map(item => item.time)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: Object.values(userThreeMonthsActivity.value).map(item => item.count),
      type: 'bar'
    }
  ]

});
</script>
<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
