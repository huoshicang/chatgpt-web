<template>
  <div id="500View">
    <n-result
      status="500"
      title="500 服务器错误"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #footer>
        <RouterLink to="/">
          <n-button>放轻松</n-button>
        </RouterLink>
      </template>
    </n-result>
  </div>
</template>

<script setup lang="ts">

import { RouterLink } from "vue-router";
</script>

<style scoped>
#500View{}
</style>
