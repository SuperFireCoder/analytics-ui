<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
<script setup lang="ts">
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
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
import { IAppActivity } from 'src/interfaces/ICharts';

use([
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  GridComponent,
]);

const userStore = useUsersStore();
const { appActivity } = storeToRefs(userStore);

/* Wanted this calc for backend but pandas is not behaving. */
const userGroups = computed(() => {
  // Get Unique Groups
  let data: IAppActivity[] = [];

  for (var index in appActivity.value) {
    data.push({
      name: appActivity.value[index].name,
      value: appActivity.value[index].value,
    });
  }

  return data;
});

const option = ref({
  title: {
    text: 'Overall application usage',
    subtext: 'Identified by the number of requests logged as keycloak activity'
  },
  legend: {
    top: 'bottom',
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
  series: {
    type: 'pie',
    data: userGroups,
    radius: [50, 250],
    center: ['50%', '50%'],
    roseType: 'area',
    itemStyle: {
      borderRadius: 8,
    },
    label: {
      rotate: 'radial',
    },
  },
});
</script>
