<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
<script setup lang="ts">
import { useUsersStore } from 'src/stores/users-store';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { SunburstChart } from 'echarts/charts';
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
  SunburstChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  GridComponent,
]);

const userStore = useUsersStore();
const { allUsersBySector } = storeToRefs(userStore);

/* Wanted this calc for backend but pandas is not behaving. */
const userGroups = computed(() => {
  // Get Unique Groups
  let data = [];
  for (var index in allUsersBySector.value) {
    data.push({
      name: index,
      children: allUsersBySector.value[index],
    });
  }
  return data;
});

const option = ref({
  silent: false,
  series: {
    type: 'sunburst',
    data: userGroups,
    radius: [0, '100%'],
    emphasis: {
      focus: 'ancestor',
    },
    label: {
      rotate: 'radial',
    },
  },
});
</script>
