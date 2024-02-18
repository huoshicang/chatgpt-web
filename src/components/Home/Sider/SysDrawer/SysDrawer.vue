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
import InfoSettings from "@/components/Home/Sider/SysDrawer/InfoSettings.vue";

const userStore = useUserStore()

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

</script>

<style scoped>
#sysDrawer {
}
</style>
