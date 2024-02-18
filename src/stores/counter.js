import { ref } from 'vue'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
import { Api } from '@/api/api.js'

export const useUserStore = defineStore('userData', () => {
  // 用户登录数据
  const userLoinData = ref({})
  // 模型列表
  const modelList = ref([])
  // 预设
  const preset = ref({})

  const getLoginUser = async () => {
    const res = await Api.verify()
    if (res.code === 200) {
      userLoinData.value = res.data
      return res
    }
  }

  // 设置登录数据
  const setVerify = (data) => {
    userLoinData.value = data
  }

  // 设置模型列表
  const setModelList = async () => {
    if (modelList.value.length === 0) {
      const res = await Api.getChatModel()
      if (res.code === 200) {
        modelList.value = res.data
      }
    }
  }

  // 设置预设
  const setPreset = (data) => {
    preset.value = data
  }

  return {
    userLoinData,
    setVerify,
    getLoginUser,
    modelList,
    preset,
    setModelList,
    setPreset
  }
})


export const useSystemStore = defineStore(
  'systemSetting',
  () => {
    // 主题
    const theme = ref(null)

    // arco主题
    const arco_theme = ref('')

    // 打字机开关
    const typing = ref(true)
    // 打字机回复速度
    const typingSpeed = ref(10)

    // 主题切换
    const themeChange = () => {
      if (!theme.value) {
        // 设置为暗黑主题
        theme.value = darkTheme
        arco_theme.value = 'dark'
        document.body.setAttribute('arco-theme', 'dark')
      } else {
        theme.value = null
        arco_theme.value = ''
        document.body.removeAttribute('arco-theme')
      }
    }

    return {
      theme,
      themeChange,
      arco_theme,
      typing,
      typingSpeed
    }
  },
  {
    persist: {
      enabled: true,
      key: 'counter',
      storage: sessionStorage,
    },
  }
)
