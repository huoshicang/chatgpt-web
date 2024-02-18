<template>
  <div id="sysDrawer">
    <n-drawer :on-mask-click="props.setShow" :show="props.show" :width="502">
      <n-drawer-content>
        <template #header> 设置</template>

        <n-tabs type="line" animated>
          <n-tab-pane name="SystemSettings" tab="系统">
            <SystemSettings />
          </n-tab-pane>
          <n-tab-pane name="infoSettings" tab="个人信息">
            <InfoSettings />
          </n-tab-pane>
        </n-tabs>

        <template #footer>
          <n-space>
            <n-popconfirm @positive-click="logOut">
              <template #trigger>
                <n-button dashed type="error">退出</n-button>
              </template>
              你确定要退出吗
            </n-popconfirm>

            <RouterLink v-if="userStore.userLoinData.userRole === 'admin'" to="/dashboard">
              <n-button type="primary"> 仪表盘</n-button>
            </RouterLink>

            <n-button dashed @click="props.setShow">关闭</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useUserStore } from '@/stores/counter'
import SystemSettings from '@/components/Home/Sider/SysDrawer/SystemSettings.vue'
import InfoSettings from '@/components/Home/Sider/SysDrawer/InfoSettings.vue'
import { Api } from '@/api/api.js'
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router";

const userStore = useUserStore()
const router = useRouter()
const message = useMessage()
const props = defineProps({
  show: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  },
  setShow: {
    type: Function,
    default: () => {
      this.show.value = !this.show.value
    }
  }
})

const logOut = async () => {
  const res = await Api.logout()

  if (res.code === 200) {
    message.success('退出成功')
    router.push({path: '/log'})
  } else {
    message.error(res.message)
  }
}
</script>

<style scoped>
#sysDrawer {
}
</style>
