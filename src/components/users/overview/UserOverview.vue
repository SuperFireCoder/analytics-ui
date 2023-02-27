<template>
  <div class="row" justify-center>
    <div class="col" style="height: 50vh"><UserSubscriptionTrend /></div>
    <div class="col-4"><UserType /></div>
  </div>
  <div class="row">
    <div class="col"></div>
  </div>
</template>
<script setup lang="ts">
import UserSubscriptionTrend from './UserSubscriptionTrend.vue';
import UserType from './UserType.vue';
</script>
