<template>
  <div id="modelIndex">
    <n-form ref="formRef" inline :model="formValue" :rules="rules" size="medium">
      <n-form-item label="模型名称" path="modelName">
        <n-input v-model:value="formValue.modelName" placeholder="输入模型名称" />
      </n-form-item>
      <n-form-item label="模型分组" path="modelGroup">
        <n-select style="width: 100px" v-model:value="formValue.modelGroup" :options="options" />
      </n-form-item>
      <n-form-item label="描述">
        <n-input v-model:value="formValue.Description" placeholder="请输入描述" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">确定添加</n-button>
      </n-form-item>
    </n-form>
    <n-divider />
    <n-data-table :columns="columns" :data="data" :pagination="paginationReactive" />
  </div>
</template>

<script setup>
import { h, onMounted, reactive, ref } from "vue";
import { NButton, useMessage } from 'naive-ui'
import { Api } from "@/api/api.js";

const formRef = ref(null)
const message = useMessage()

// 表单数据
const formValue = reactive({
  modelName: '',
  modelGroup: 'GPT3.5',
  Description: ''
})

// 表单验证规则
const rules = {
  modelName: {
    required: true,
    message: '请输入模型名称',
    trigger: ['input', 'blur']
  },
  modelGroup: {
    required: true,
    message: '请选择分组',
    trigger: ['input', 'blur']
  }
}

// 分组选项
const options = [
  {
    label: 'GPT3.5',
    value: 'GPT3.5'
  },
  {
    label: 'GPT4',
    value: 'GPT4'
  }
]

// 数据
const data = ref([])

// 分页控制
const paginationReactive = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 7],
  onChange: (page) => {
    paginationReactive.page = page
  }
})

// 列
const columns = [
  {
    title: '模型名称',
    key: 'modelName'
  },
  {
    title: '分组',
    key: 'modelGroup'
  },
  {
    title: '描述',
    key: 'Description',
  },
  {
    title: '操作',
    key: '操作',
    render (row) {
      return h(
        NButton,
        {
          type: 'error',
          size: 'small',
          onClick: () => deleteModel(row)
        },
        { default: () => '删除' }
      )
    }
  }
]

// 表单提交
const handleValidateClick = (e) => {
  e.preventDefault()
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await Api.addModel(formValue)
      if (res.code === 200){
        message.success('添加成功')
        await getData()
      }else {
        message.error(res.message)
      }
    }
  })
}


// 删除
const deleteModel = async (row) => {
  const res = await Api.deleteModel(row)
  if (res.code === 200) {
    message.success('删除成功')
    await getData()
  }else {
    message.error(res.message)
  }
}

// 获取数据
const getData = async () => {
  const res = await Api.getModel({
    page: paginationReactive.page,
    pageSize: paginationReactive.pageSize
  })
  if (res.code === 200) {
    data.value = res.data
  }else{
    message.error(res.message)
  }
}

onMounted(async () => {
  await getData()
})


</script>

<style scoped>
#modelIndex {
}
</style>
