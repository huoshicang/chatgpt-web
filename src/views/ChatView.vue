<template>
  <a-layout class="layout-demo">
    <a-layout-sider :width="215" :collapsed-width="60" :collapsed="collapsed" breakpoint="xl">
      <SiderIndex :collapsed="collapsed" :onCollapse="onCollapse" />
    </a-layout-sider>
    <a-layout style="padding: 10px">
      <a-layout-content style="color: var(--color-text-1); padding: 30px">
        <ContentIndex :SendFlag="SendFlag" :setSendFlag="setSendFlag" :SendMsg="SendMsg" />
      </a-layout-content>
      <a-layout-footer>
        <FooterIndex :SendFlag="SendFlag" :setSendFlag="setSendFlag" @sendMsg="sendMsg" />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import SiderIndex from '@/components/Home/Sider/SiderIndex.vue'
import FooterIndex from '@/components/Home/Footer/FooterIndex.vue'
import ContentIndex from '@/components/Home/Content/ContentIndex.vue'

const message = useMessage()

const router = useRouter()

// 折叠
const collapsed = ref(false)
const onCollapse = () => {
  collapsed.value = !collapsed.value
}

const SendMsg = ref('')

// 消息是否返回
const SendFlag = ref(false)
const setSendFlag = () => {
  SendFlag.value = !SendFlag.value
}

// 发送消息
const sendMsg = async (msg) => {
  if (router.currentRoute.value.params.uuid === '') {
    message.info('请先选择聊天')
  } else {
    SendMsg.value = msg
  }
}
</script>

<style scoped>
.layout-demo {
  height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) {
  padding: 5px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  min-height: 48px;
  max-height: 220px;
  color: var(--color-text-1);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-demo :deep(.arco-layout-content) {
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
  overflow: auto;
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
}
</style>
