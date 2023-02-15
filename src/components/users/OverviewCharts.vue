<template>
  <div class="row items-align-center">
    <div class="col"><UserSubscriptionTrend /></div>

    <div class="col"><UserType /></div>
  </div>
  <div class="row">
    <div class="col"></div>
  </div>
</template>
<script setup lang="ts">
import UserSubscriptionTrend from './charts/UserSubscriptionTrend.vue';
import UserType from './charts/UserType.vue';
</script>
