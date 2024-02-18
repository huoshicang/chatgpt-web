<template>
  <a-layout class="layout-demo">
    <a-layout-header>
      <DashboardHeader />
    </a-layout-header>
    <a-layout style="padding: 10px">
      <a-layout-content style="padding: 20px">
        <RouterView  name="Dashboard"/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import DashboardHeader from '@/components/Dashboard/DashboardHeader.vue'
import { RouterView } from "vue-router";
</script>

<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}


.layout-demo :deep(.arco-layout-content) {
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
  overflow: auto;
  font-stretch: condensed;
}

</style>
