<template>
  <n-message-provider>
    <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme="system.theme">
      <n-global-style />
        <RouterView name="App" />
    </n-config-provider>
  </n-message-provider>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useSystemStore } from "@/stores/counter";
import { zhCN, dateZhCN } from "naive-ui";

const system = useSystemStore()



</script>
<style scoped></style>
