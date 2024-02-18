<template>
  <div id="siderIndex">
    <n-space vertical>
      <!-- 收缩侧边栏 -->

      <n-button block dashed type="primary" @click="props.onCollapse">
        <template #icon>
          <IconCaretRight v-show="props.collapsed" />
          <IconCaretLeft v-show="!props.collapsed" />
        </template>
      </n-button>

      <!-- 新的聊天 -->
      <NewChat
        :addChatModel="props.addChatModel"
        :collapsed="props.collapsed"
        @addHistory="addNowHistory"
      />
    </n-space>

    <n-scrollbar style="height: calc(100vh - 194px); max-height: calc(100vh - 194px)">
      <HistoricalRecord
        :chatNowData="chatNowData"
        :collapsed="props.collapsed"
      />
    </n-scrollbar>

    <UserInfo style="margin-top: 10px; margin-bottom: -1px" :collapsed="collapsed" />
  </div>
</template>

<script setup>
import UserInfo from '@/components/Home/Sider/UserInfo.vue'
import { defineProps, ref } from 'vue'
import HistoricalRecord from '@/components/Home/Sider/HistorySiss/HistoricalRecord.vue'
import NewChat from '@/components/Home/Sider/NewChat.vue'

/** 给组件指定初始值 */
const props = defineProps({
  collapsed: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  },
  onCollapse: {
    type: Function,
    default: () => {
      this.collapsed.value = !this.collapsed.value
    }
  },
  addChatModel: {
    type: Object
  },
})

const chatNowData = ref([])

const addNowHistory = (model) => {
  chatNowData.value.unshift(model)
}
</script>

<style scoped>
#siderIndex {
}
</style>
