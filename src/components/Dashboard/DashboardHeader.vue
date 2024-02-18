<template>
  <n-layout-header :inverted="inverted" bordered>
    <n-menu mode="horizontal" :inverted="inverted" :options="menuOptions" />
  </n-layout-header>
</template>

<script>
import { h, defineComponent, ref } from 'vue'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  KeyOutline,
  ChatbubbleEllipsesOutline,
  PeopleOutline,
  LogoReddit,
  HomeOutline
} from '@vicons/ionicons5'

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/'
          }
        },
        { default: () => '返回主页' }
      ),
    key: 'home',
    icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/dashboard/user'
          }
        },
        { default: () => '用户管理' }
      ),
    key: 'user',
    icon: renderIcon(PeopleOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/zh-CN/os-theme/components/code'
          }
        },
        { default: () => '聊天管理' }
      ),
    key: 'chat',
    icon: renderIcon(ChatbubbleEllipsesOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/dashboard/model'
          }
        },
        { default: () => '模型管理' }
      ),
    key: 'model',
    icon: renderIcon(LogoReddit)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/dashboard/key'
          }
        },
        { default: () => '密钥管理' }
      ),
    key: 'key',
    icon: renderIcon(KeyOutline)
  }
]

export default defineComponent({
  setup() {
    return {
      inverted: ref(false),
      menuOptions
    }
  }
})
</script>
