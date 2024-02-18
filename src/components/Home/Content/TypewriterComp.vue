<template>
  <div id="typewriterComp">
    <a-comment author="ChatGPTAPI" align="right">
      <template #avatar>
        <a-avatar>
          <img
            alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </a-avatar>
      </template>
      <template #content>
        <TextComp :content="content" />
      </template>
    </a-comment>
  </div>
</template>

<script setup>
import { useSystemStore } from '@/stores/counter'

const system = useSystemStore()

import { onBeforeUnmount, ref, watchEffect } from "vue";
import TextComp from "@/components/Home/Content/TextComp.vue";

const props = defineProps({
  Msg: {
    type: Object
  },
  MsgPush: {
    type: Function,
  }
})

const content = ref('')

watchEffect(() => {
  if (props.Msg.content){
    
    let i = 0;
    let timer;
    
    // 打字机效果
    const typeContent = () => {
      content.value = props.Msg.content.substring(0, i++);
      if (i >= props.Msg.content.length) {
        clearInterval(timer);
        props.MsgPush(props.Msg, true)
      }
    };
    
    if (timer) clearInterval(timer);
    timer = setInterval(typeContent, system.typingSpeed);
    
    
    onBeforeUnmount(() => clearInterval(timer));
  }
  
  
})

</script>

<style scoped>
#typewriterComp {
}
</style>
