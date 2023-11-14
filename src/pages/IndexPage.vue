<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TopTile from '../components/dashboard/TopTiles.vue';
import { useGlobalStore } from '../stores/global-store';
import { api } from 'src/boot/axios';
import { IExperimentAnalytics, ExperimentStatus, IExperimentStatusItem, AlgorithmSourceType } from '../interfaces/IExperiments'

const store = useGlobalStore();
store.setLoaderStatus({
  isLoading: true,
  text: 'Loading Analytics Data...',
});

const tab = ref<string>('ec')

const extractExperimentCount = (statusType: ExperimentStatus, data: IExperimentStatusItem[]) => {
  const index = data.findIndex((item) => item.name === statusType)
  if (index > -1) {
    return data[index].total;
  }
  return '--'
}
const extractRowSum = (data: IExperimentStatusItem[]) => {
  let sum = 0;
  data.forEach((item) => {
    sum += item.total;
  })
  return sum;
}
let experimentSummary = ref<IExperimentAnalytics | undefined>()
// fetch data on mounted
onMounted(async () => {

  return api.get('api/jobrequests/summary/').then((response) => {
    if ('experimentsByType' in response.data) {
      experimentSummary.value = response.data;
    }

  }).finally(() => {
    store.setLoaderStatus({
      isLoading: false,
      text: '',
    });
  })

});


</script>
<template>
  <q-page padding class="q-gutter-y-md bg-grey-1">
    <div class="row q-gutter-x-md">

      <TopTile icon="fas fa-plus" colorClasses="bg-indigo text-grey-3" title="Created"
        :value="experimentSummary?.experimentsByStatus[ExperimentStatus.CREATED]" />
      <TopTile icon="fas fa-hourglass" colorClasses="bg-amber" title="In Processing"
        :value="experimentSummary?.experimentsByStatus[ExperimentStatus.IN_PROGRESS]" />
      <TopTile icon="fas fa-times" colorClasses="bg-red" title="Failed"
        :value="experimentSummary?.experimentsByStatus[ExperimentStatus.FAILED]" />
      <TopTile icon="fas fa-check" colorClasses="bg-green-8" title="Completed"
        :value="experimentSummary?.experimentsByStatus[ExperimentStatus.COMPLETED]" />

    </div>

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-bold bg-grey-9 text-grey-2 text-left">Experiment</th>
          <th class="text-bold bg-grey-9 text-grey-2 text-center">Created</th>
          <th class="text-bold bg-grey-9 text-grey-2 text-center">In Progress</th>
          <th class="text-bold bg-grey-9 text-grey-2 text-center">Failed</th>
          <th class="text-bold bg-grey-9 text-grey-2 text-center">Completed</th>
          <th class="text-bold bg-grey-9 text-grey-2 text-center ">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="experimentType in experimentSummary?.experimentsByTypeStatus" :key="experimentType.name">
          <td class="text-left text-bold">
            {{ experimentType.name }}
          </td>
          <td class="text-center">
            {{ extractExperimentCount(ExperimentStatus.CREATED, experimentType.status) }}
          </td>
          <td class="text-center">
            {{ extractExperimentCount(ExperimentStatus.IN_PROGRESS, experimentType.status) }}
          </td>
          <td class="text-center">
            {{ extractExperimentCount(ExperimentStatus.FAILED, experimentType.status) }}
          </td>
          <td class="text-center">
            {{ extractExperimentCount(ExperimentStatus.COMPLETED, experimentType.status) }}
          </td>
          <td class="text-center text-bold bg-grey-3">
            {{ extractRowSum(experimentType.status) }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="ec" label="EC Algorithms" />
      <q-tab name="bsc" label="BSC Algorithms" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="ec" class="q-pa-none">
        <!-- Should have used components but i am heck lazy atm been woprking ont his since 4 am -->
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-bold bg-grey-9 text-grey-2 text-left">Algorithm</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Created</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">In Progress</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Failed</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Completed</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center ">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(algoDetails, algoName) in experimentSummary?.algorithmsByTypeStatus[AlgorithmSourceType.EC]"
              :key="algoName">
              <td class="text-left text-bold">
                {{ algoName }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.CREATED] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.IN_PROGRESS] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.FAILED] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.COMPLETED] }}
              </td>
              <td class="text-center text-bold bg-grey-3">
                {{ Number(algoDetails[ExperimentStatus.CREATED] ?? 0) +
                  Number(algoDetails[ExperimentStatus.IN_PROGRESS] ?? 0) +
                  Number(algoDetails[ExperimentStatus.FAILED] ?? 0) +
                  Number(algoDetails[ExperimentStatus.COMPLETED] ?? 0) }}
              </td>


            </tr>
          </tbody>
        </q-markup-table>
      </q-tab-panel>

      <q-tab-panel name="bsc q-padding-none">
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-bold bg-grey-9 text-grey-2 text-left">Algorithm</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Created</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">In Progress</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Failed</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center">Completed</th>
              <th class="text-bold bg-grey-9 text-grey-2 text-center ">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(algoDetails, algoName) in experimentSummary?.algorithmsByTypeStatus[AlgorithmSourceType.BSC]"
              :key="algoName">
              <td class="text-left text-bold">
                {{ algoName }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.CREATED] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.IN_PROGRESS] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.FAILED] }}
              </td>
              <td class="text-center">
                {{ algoDetails[ExperimentStatus.COMPLETED] }}
              </td>
              <td class="text-center text-bold bg-grey-3">
                {{ Number(algoDetails[ExperimentStatus.CREATED] ?? 0) +
                  Number(algoDetails[ExperimentStatus.IN_PROGRESS] ?? 0) +
                  Number(algoDetails[ExperimentStatus.FAILED] ?? 0) +
                  Number(algoDetails[ExperimentStatus.COMPLETED] ?? 0) }}
              </td>


            </tr>
          </tbody>
        </q-markup-table>
      </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

