<template>
  <div id="systemSettings">
    <n-list hoverable clickable>
      <n-list-item>
        <n-thing title="主题">
          <n-space>
            <n-button
              @click="system.themeChange()"
              dashed
              circle
              :type="system.arco_theme === 'dark' ? '' : 'primary'"
            >
              <template #icon>
                <n-icon>
                  <SunnyOutline />
                </n-icon>
              </template>
            </n-button>
            <n-button
              @click="system.themeChange()"
              dashed
              circle
              :type="system.arco_theme === 'dark' ? 'primary' : ''"
            >
              <template #icon>
                <n-icon>
                  <MoonOutline />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-thing>
      </n-list-item>
      <n-list-item>
        <n-thing title="打字机（逐字输出）">
          <n-form inline size="medium" :label-width="80">
            <n-form-item label="开关">
              <n-switch size="large" v-model:value="system.typing" />
            </n-form-item>
            <n-form-item label="输出速度">
              <n-slider
                style="width: 300px"
                v-model:value="system.typingSpeed"
                :step="1"
                :marks="marks"
                :max="200"
                :min="5"
              />
            </n-form-item>
          </n-form>
        </n-thing>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { useSystemStore } from '@/stores/counter'
import { ref } from 'vue'

const system = useSystemStore()

const marks = ref({
  5: '快',
  200: '慢'
})
</script>

<style scoped>
#systemSettings {
}
</style>
