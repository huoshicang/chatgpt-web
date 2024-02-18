<template>
  <div id="404View">
    <n-result status="403" title="403 禁止访问" description="总有些门是对你关闭的">
      <template #footer>
        <RouterLink to="/">
          <n-button>放轻松</n-button>
        </RouterLink>
      </template>
    </n-result>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
#404View {
}
</style>
