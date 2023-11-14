<script setup lang="ts">
const props = defineProps({
  colorClasses: {
    type: String,
    default: 'bg-amber',
  },
  title: {
    type: String,
    default: 'Created',
  },
  value: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
    default: 'fas fa-clipboard-list',
  },
})
</script>
<template>
  <q-card class="col text-center" :class="props.colorClasses">
    <q-card-section class="q-py-sm">
      <div class="text-subtitle1 text-bold"><q-icon :name="props.icon" /> {{ props.title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h3">{{ props.value }}</div>
    </q-card-section>
  </q-card>
</template>
