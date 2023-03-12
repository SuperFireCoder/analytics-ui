<template>
  <q-page class="row items-center justify-evenly">{{ url }}
  </q-page>
</template>

<script setup lang="ts">
const url = process.env.ANALYTICS_API_URL;

</script>
