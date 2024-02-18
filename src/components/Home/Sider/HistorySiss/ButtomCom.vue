<template>
  <div id="buttomCom">
    <n-space vertical>
      <n-popover trigger="hover"
        v-for="(item, index) in props.chatData"
        :key="index"
      >
        <template #trigger>
          <n-button
            :type="item.msg_id === router.currentRoute.value.params.uuid ? 'primary' : ''"
            block
            :dashed="item.msg_id !== router.currentRoute.value.params.uuid"
            strong
            :secondary="!item.msg_id === router.currentRoute.value.params.uuid"
            @click="toMessage(item.msg_id)">
          <span v-if="!props.collapsed">
            {{ item.chatTitle }}
          </span>
            <template #icon v-if="props.collapsed">
              <a-tooltip :content="item.chatTitle" position="right" mini>
                <n-icon>
                  <icon-message />
                </n-icon>
              </a-tooltip>
            </template>
          </n-button>
        </template>
        <n-space vertical>
          <n-button @click="deleteChat(item)">
            删除
            <template #icon>
              <TrashOutline />
            </template>
          </n-button>
          <n-button>
            更换key
            <template #icon>
              <Refresh />
            </template>
          </n-button>
        </n-space>
      </n-popover>
    </n-space>
  </div>
</template>

<script setup>
import { useMessage } from "naive-ui";
import { useRouter } from 'vue-router'
import { TrashOutline, Refresh } from "@vicons/ionicons5";
import { Api } from "@/api/api.js";
import { useUserStore } from '@/stores/counter'

const userStore = useUserStore()
const message = useMessage()
const router = useRouter()

// 父级传参
const props = defineProps({
  collapsed: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  },
  chatData:{
    type: Array,
  }
})

// 跳转到聊天页面
const toMessage = (msg_id) => {
  router.replace({path: `/chat/${msg_id}`})
}

// 删除
const deleteChat = async (item) => {
  console.log(item);
  const res = await Api.deleteChat({...item, user_id: userStore.userLoinData.user_id})
  
  console.log(res)
  
  if (res.code === 200) {
    message.success('删除成功')
    props.chatData.splice(props.chatData.indexOf(item), 1)
  } else {
    message.error(res.message)
  }
  
}
</script>

<style scoped>
#historicalRecord {
}
</style>
