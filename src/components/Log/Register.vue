<template>
    <n-form id="signUp" ref="formRef" :rules="rules" :model="formValue">
      <n-form-item path="userName" label="用户名">
        <n-input v-model:value="formValue.userName" placeholder="请输入用户名" />
      </n-form-item>
      <n-form-item path="passWord" label="密码">
        <n-input
          show-password-on="click"
          v-model:value="formValue.passWord"
          type="password"
          placeholder="请输入密码"
        >
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutline" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="Glasses" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="verifyWord" label="确认密码">
        <n-input
          show-password-on="click"
          v-model:value="formValue.verifyWord"
          type="password"
          placeholder="请输入密码"
        >
          <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutline" />
          </template>
          <template #password-invisible-icon>
            <n-icon :size="16" :component="Glasses" />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="email" label="邮箱">
        <n-input v-model:value="formValue.email" type="password" placeholder="请输入邮箱" />
      </n-form-item>
    </n-form>
    <n-button type="primary" block secondary strong @click="handleValidateClick">注册</n-button>

</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Api } from '@/api/api.js'
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router";
import { Glasses, GlassesOutline } from "@vicons/ionicons5";

const message = useMessage()
const router = useRouter()
//  元素
const formRef = ref(null)
// 表单值
const formValue = reactive({
  userName: '',
  passWord: '',
  verifyWord: '',
  email: ''
})

// 校验规则
const rules = {
  userName: {
    required: true,
    trigger: 'blur',
    message: '用户名必填'
  },
  passWord: {
    required: true,
    trigger: 'blur',
    message: '密码必填'
  },
  verifyWord: [
    {
      required: true,
      trigger: 'blur',
      message: '密码必填'
    },
    {
      trigger: ['input', 'blur'],
      level: 'warning',
      validator(_rule, value) {
        if (formRef.value.model.passWord !== value) {
          return new Error('两次密码不同')
        }
        return true
      }
    }
  ],
  email: {
    required: true,
    trigger: 'blur',
    message: '邮箱必填'
  }
}

// 提交
const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await Api.register(formValue)
      if (res.code === 200) {
        message.success('注册成功')
        await router.push({path: '/'})
      } else {
        message.error(res.message)
      }
      
    }
  })
}
</script>

<style scoped>
#signUp {
}
</style>
