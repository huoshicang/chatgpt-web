<template>
  <div id="newChat">
    <n-button block dashed type="primary" @click="show = !show" style="margin-bottom: 10px">
      <template #icon v-if="props.collapsed">
        <IconPenFill />
      </template>
      <span v-if="!props.collapsed"> 新建聊天 </span>
    </n-button>
  </div>

  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content title="新建聊天" closable>
      <n-form ref="formRef" :model="model" :rules="rules" label-placement="top">
        <n-form-item label="标题" path="chatTitle">
          <n-input v-model:value="model.chatTitle" placeholder="请输入标题" />
        </n-form-item>

        <n-form-item label="模型" path="chatParameters.model">
          <n-select v-model:value="model.chatParameters.model" :options="userStore.modelList" />
        </n-form-item>

        <n-form-item label="思维散发" path="chatParameters.temperature">
          <n-slider
            :max="2"
            :min="0"
            v-model:value="model.chatParameters.temperature"
            :step="0.1"
          />
        </n-form-item>
      </n-form>

      <n-form-item label="预设" path="system">
        <n-select v-model:value="model.system" placeholder="请选择预设" :options="options" />
      </n-form-item>

      <template #footer>
        <n-button type="primary" @click="handleValidateButtonClick">创建</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useUserStore } from '@/stores/counter'
import { Api } from '@/api/api.js'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const props = defineProps({
  collapsed: {
    type: Boolean, // 数据类型
    default: false // 未传值时的默认值
  }
})

// 新建聊天抽屉开关
const show = ref(false)

const formRef = ref(null)
const message = useMessage()

// 新建聊天
const model = ref({
  user_id: userStore.userLoinData.user_id,
  userName: userStore.userLoinData.userName,
  chat_id: uuid(),
  msg_id: '',
  chatTitle: '',
  system: '',
  chatParameters: {
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    top_p: 1
  }
})

// 验证
const rules = {
  chatTitle: {
    required: true,
    trigger: ['input'],
    message: '请输入标题'
  },
  chatParameters: {
    model: {
      required: true,
      trigger: ['input'],
      message: '请选择模型'
    }
  }
}

// 子组件
const emit = defineEmits(['addHistory'])

// 添加历史记录
const addNowHistory = (model) => {
  emit('addHistory', model)
}

// 新建
const handleValidateButtonClick = () => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      // 生成msg_id
      const msg_id = uuid()
      model.value.msg_id = msg_id
      const res = await Api.addChat(model.value)

      if (res.code === 200) {
        message.success('创建成功')
        addNowHistory(model.value)
        show.value = false

        // 跳转
        await router.replace('/chat/' + msg_id)

        // 重置
        model.value = {
          user_id: userStore.userLoinData.user_id,
          userName: userStore.userLoinData.userName,
          chat_id: uuid(),
          msg_id: '',
          chatTitle: '',
          system: '',
          chatParameters: {
            model: 'gpt-3.5-turbo-0613',
            temperature: 0.8,
            top_p: 1
          }
        }
      } else {
        message.error(res.message)
      }
    }
  })
}

onMounted(async () => {
  await userStore.setModelList()
})
</script>

<style scoped>
#newChat {
}
</style>
