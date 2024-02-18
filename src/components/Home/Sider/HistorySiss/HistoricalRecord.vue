<template>
  <div id="historicalRecord">
    <n-space vertical>
      <ButtomCom :chatData="props.chatNowData" :collapsed="props.collapsed" />
      <ButtomCom :chatData="chatData" :collapsed="props.collapsed" />
    </n-space>
  </div>
  
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Api } from "@/api/api.js";
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/counter'
import ButtomCom from "@/components/Home/Sider/HistorySiss/ButtomCom.vue";

const userStore = useUserStore()
const message = useMessage()

// 父级传参
const props = defineProps({
  collapsed: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  },
  chatNowData:{
    type: Array,
  }
})


// 聊天对话
const chatData = ref([])

// 获取聊天对话
const getData = async () => {
  const res = await Api.getChat({ user_id: userStore.userLoinData.user_id })
  if (res.code === 200) {
    chatData.value = res.data
  } else {
    message.error(res.message)
  }
}

onMounted(async () => {
  await getData()
})
</script>

<style scoped>
#historicalRecord {
}
</style>
