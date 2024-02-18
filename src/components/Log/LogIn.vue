<template>
  <div id="signIn">
    <n-form ref="formRef" :rules="rules" :model="formValue">
      <n-form-item path="account" label="用户名">
        <n-input v-model:value="formValue.account" placeholder="请输入用户名" />
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
    </n-form>
    <n-flex justify="space-between" style="margin-bottom: 10px">
      <n-checkbox v-model:checked="remember" style="margin: 0 10px"> 记住密码</n-checkbox>

      <n-button text>忘记密码</n-button>
    </n-flex>

    <n-button type="primary" block secondary strong @click="handleValidateClick"> 登录</n-button>
    <n-divider />
    <n-button type="primary" block secondary strong @click="aaa"> 测试账号登录 </n-button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Api } from '@/api/api.js'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { Glasses, GlassesOutline } from '@vicons/ionicons5'

const userStore = useUserStore()
const message = useMessage()
const router = useRouter()

//  元素
const formRef = ref(null)
// 记住密码
const remember = ref(false)

// 表单值
const formValue = reactive({
  account: '',
  passWord: ''
})

// 校验规则
const rules = {
  account: {
    required: true,
    trigger: 'blur',
    message: '用户名必填'
  },
  passWord: {
    required: true,
    trigger: 'blur',
    message: '密码必填'
  }
}

// 提交
const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await Api.login(formValue)
      if (res.code === 200) {
        message.success('登录成功')
        userStore.userLoinData = res.data
        await router.push('/')
        setRremember()
      } else {
        message.error(res.message)
      }
    }
  })
}

const aaa = async () => {
  formValue.account = 'user'
  formValue.passWord = '123'
  const res = await Api.login(formValue)
  if (res.code === 200) {
    message.success('登录成功')
    userStore.userLoinData = res.data
    await router.push('/')
    setRremember()
  } else {
    message.error(res.message)
  }
}

// 设置记住密码
const setRremember = () => {
  console.log(remember.value)
  if (remember.value) {
    let data = localStorage.getItem('remember')

    console.log(data)

    if (data) {
      data = JSON.parse(data)
      if (data.account !== formValue.account || data.passWord !== formValue.passWord) {
        localStorage.setItem('remember', JSON.stringify(formValue))
      }
    } else {
      localStorage.setItem('remember', JSON.stringify(formValue))
    }
  } else {
    localStorage.removeItem('remember')
  }
}

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('remember'))

  if (data) {
    remember.value = true
    formValue.account = data.account
    formValue.passWord = data.passWord
  }
})
</script>

<style scoped>
#signIn {
}
</style>
