<template>
  <div id="userInfo">
    <a-card hoverable v-if="!props.collapsed">
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <span :style="{ display: 'flex', alignItems: 'center' }">
          <a-avatar :style="{ marginRight: '8px' }" :size="28">
            <img class="avatar" src="https://avatars.githubusercontent.com/u/20943608?s=60&v=4" alt="">
          </a-avatar>
          <n-space vertical>
            <a-typography-text>{{ userStore.userLoinData.userName }}</a-typography-text>
            <n-ellipsis style="max-width: 100px" v-if="userStore.userLoinData.description !== '' && userStore.userLoinData.description">
              {{ userStore.userLoinData.description }}
            </n-ellipsis>
            <n-text type="warning" v-else> 可以添加描述 </n-text>
          </n-space>
        </span>
        <n-button dashed circle @click="setShow">
          <template #icon>
            <n-icon>
              <SettingsOutline />
            </n-icon>
          </template>
        </n-button>
      </div>
    </a-card>
    <SysDrawer :show="show" :setShow="setShow" />
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { SettingsOutline } from '@vicons/ionicons5'
import SysDrawer from '@/components/Home/Sider/SysDrawer/SysDrawer.vue'
import { useUserStore } from '@/stores/counter'

const userStore = useUserStore()

const props = defineProps({
  collapsed: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  }
})

// 设置 抽屉 开关
const show = ref(false)
// 设置打开或者关闭
const setShow = () => {
  show.value = !show.value
}
</script>

<style scoped>
#userInfo {
}
</style>
