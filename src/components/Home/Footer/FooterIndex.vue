<template>
  <div id="footerIndex">
    <n-input-group >
      <n-input
        v-model:value="msg"
        placeholder="ChatGPT可能会犯错误。请考虑核实重要信息。"
        type="textarea"
        :autosize="{
        minRows: 1,
        maxRows: 5
      }"
        :disabled="props.SendFlag"
      />
      <n-button type="primary" @click="sendMsg" :disabled="props.SendFlag">
        <template #icon>
          <n-icon>
            <PaperPlaneOutline/>
          </n-icon>
        </template>
      </n-button>
    </n-input-group>
    
  </div>
</template>

<script setup>
import { ref } from "vue";
import { PaperPlaneOutline } from "@vicons/ionicons5";
const msg = ref("");

/** 给组件指定初始值 */
const props = defineProps({
  SendFlag: {
    type: Boolean,
  },
  setSendFlag: {
    type: Function,
  }
})

const emit = defineEmits(['sendMsg']);

// 处理切换每页大小
const sendMsg = () => {
  emit('sendMsg', msg.value);
  
  msg.value = ''
};

</script>

<style scoped>
#footerIndex{}
</style>
