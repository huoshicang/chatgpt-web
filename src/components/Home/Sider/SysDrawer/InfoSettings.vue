<template>
  <div id="infoSettings">
    <n-list hoverable clickable>
      <n-list-item>
        <n-alert type="warning"> 修改用户名或邮箱后，需要使用新的信息登录 </n-alert>
      </n-list-item>
      <!--<n-list-item>-->
      <!--  <n-thing title="头像">-->
      <!--    <n-upload-->
      <!--      action="http://localhost:3001/upavatar"-->
      <!--      :default-file-list="fileList"-->
      <!--      list-type="image-card"-->
      <!--    >-->
      <!--      点击上传-->
      <!--    </n-upload>-->
      <!--  </n-thing>-->
      <!--</n-list-item>-->

      <n-list-item>
        <n-thing title="用户名">
          <n-input v-model:value="formValue.userName" placeholder="请输入用户名" />
        </n-thing>
      </n-list-item>

      <n-list-item>
        <n-thing title="邮箱">
          <n-input v-model:value="formValue.email" placeholder="请输入邮箱" />
        </n-thing>
      </n-list-item>

      <n-list-item>
        <n-thing title="描述">
          <n-input v-model:value="formValue.description" placeholder="请输入描述" />
        </n-thing>
      </n-list-item>
    </n-list>

    <n-button type="primary" @click="updateInfo"> 确定 </n-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/counter'
import { Api } from '@/api/api.js'
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router";

const router = useRouter()
const message = useMessage()
const userStore = useUserStore()

// 编辑文本
const formValue = reactive({
  user_id: userStore.userLoinData.user_id,
  userName: userStore.userLoinData.userName,
  description: userStore.userLoinData.description,
  email: userStore.userLoinData.email
})

// const fileList = ref([])

// 修改信息
const updateInfo = async () => {
  const res = await Api.updateInfo(formValue)

  if (res.code === 200) {
    message.success('修改成功')
    router.push({path: '/log'})
  } else {
    message.error('修改失败')
  }
}
</script>

<style scoped>
#infoSettings {
}
</style>
