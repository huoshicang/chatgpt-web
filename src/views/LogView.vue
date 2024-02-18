<template>
  <div id="logView">
    <n-card style="width: 350px" >
      <n-tabs default-value="LogIn" type="segment" animated>
        <n-tab-pane name="LogIn" tab="登录">
          <LogIn />
        </n-tab-pane>
        <n-tab-pane name="Register" tab="注册">
          <Register />
        </n-tab-pane>
      </n-tabs>
      <n-flex justify="space-between" style="margin-top: 10px">
        <n-button text @click="system.themeChange()">切换主题</n-button>
      </n-flex>
    </n-card>
  </div>
</template>

<script setup>
import { useSystemStore, useUserStore } from '@/stores/counter'
import Register from '@/components/Log/Register.vue'
import LogIn from '@/components/Log/LogIn.vue'
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const system = useSystemStore()
const userStore = useUserStore()

onMounted(() => {
  if (userStore?.userLoinData?.user_id){
    router.push({path: "/"})
  }
})


</script>

<style scoped>
#logView{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
