<template>
  <div id="contentIndex">
    <a-comment
      :author="author(item.role)"
      align="right"
      v-for="(item, index) in msgList.messages"
      :key="index"
    >
      <template #actions>
        <a-typography-paragraph copyable :copy-text="item.content" />
      </template>
      <template #avatar>
        <a-avatar>
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
      <template #content>
        <TextComp :content="item.content" />
      </template>
    </a-comment>

    <!--加载回复-->
    <RecoverComp v-show="props.SendFlag" />

    <TypewriterComp :Msg="Msg" :MsgPush="MsgPush" v-if="Msg.content" />

    <n-space justify="center" v-show="props.SendFlag" style="margin-bottom: 20px">
      <n-button strong secondary type="warning">
        停止
        <template #icon>
          <n-icon>
            <StopCircleOutline />
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from 'vue'
import { StopCircleOutline } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import { useUserStore, useSystemStore } from '@/stores/counter'
import { Api } from '@/api/api.js'
import { useMessage } from 'naive-ui'
import RecoverComp from '@/components/Home/Content/RecoverComp.vue'
import TypewriterComp from '@/components/Home/Content/TypewriterComp.vue'
import TextComp from "@/components/Home/Content/TextComp.vue";

const system = useSystemStore()
const userStore = useUserStore()
const router = useRouter()
const message = useMessage()


/** 给组件指定初始值 */
const props = defineProps({
  SendMsg: {
    type: String
  },
  SendFlag: {
    type: Boolean
  },
  // 发送回复标识
  setSendFlag: {
    type: Function
  }
})

// 作者
const author = (role) => {
  if (role === 'system') return '系统'
  else if (role === 'assistant') return 'ChatGPTAPI'
  else return '你'
}

// 消息列表
const msgList = ref({ messages: [] })

// 获取消息列表
const getData = async (uuid) => {
  const res = await Api.getChatMsg({
    user_id: userStore.userLoinData.user_id,
    msg_id: uuid
  })

  if (res.code === 200) {
    msgList.value = res.data
  } else if (res.message === '未找到对话记录') {
    await router.push({ name: 'Chat' })
  } else {
    message.error(res.message)
  }
}



// 打字机消息
const Msg = ref({})

// 插入消息
const MsgPush = (newMessage, assistant = false) => {
  msgList.value.messages.push(newMessage)

  if (assistant) Msg.value = {}
}

// 发送消息
const sendMsg = async (newMessage) => {
  props.setSendFlag()

  MsgPush({
    role: 'user',
    content: newMessage
  })

  const res = await Api.sendMsg(msgList.value)

  if (res.code === 200) {
    
    if (system.typing) {
      Msg.value = res.data
    } else {
      MsgPush(res.data, true)
    }
  } else {
    message.error(res.message)
  }

  props.setSendFlag()
}

// // 根据路由参数 请求数据
// onMounted(async () => {
//   // 路由参数
//   const currentRouteName = router.currentRoute.value.matched[0].name
//   const currentRouteUUID = router.currentRoute.value.params.uuid
//
//   if (msgList.value.messages.length === 0 && currentRouteName === 'Chat' && currentRouteUUID) {
//     await getData(currentRouteUUID)
//   }
// })

// 监听发送消息
watch([() => props.SendMsg], ([newMessage], [oldMessage]) => {
  if (newMessage !== oldMessage) {
    if (newMessage === '') return
    sendMsg(newMessage)
  }
})

// 路由变化
watchEffect(async () => {
  const currentRouteName = router.currentRoute.value.matched[0].name
  const currentRouteUUID = router.currentRoute.value.params.uuid

  if (currentRouteName === 'Chat' && currentRouteUUID) {
    await getData(currentRouteUUID)
  }
})
</script>

<style scoped>
#contentIndex {
}

#contentIndex .item {
  padding: 10px;
  margin: 10px;
  display: flex;
  align-items: flex-start;
}

#contentIndex .item .avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
