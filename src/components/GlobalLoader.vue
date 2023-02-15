<template>
  <q-dialog
    v-model="loader!.isLoading"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px" class="text-center q-py-md">
      <q-card-section>
        <q-spinner-gears color="primary" size="6em" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle2">{{ loader.text }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useGlobalStore } from 'src/stores/global-store';
import { storeToRefs } from 'pinia';

const loaderStore = useGlobalStore();

const { loader } = storeToRefs(loaderStore);
</script>
