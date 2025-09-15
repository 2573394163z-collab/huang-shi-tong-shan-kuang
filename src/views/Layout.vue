<script setup lang="ts">
import KtNav from '@/components/kt-ui/kt-nav.vue'
import KtTimer from '@/components/utils-ui/kt-timer.vue'
import autofit from 'autofit.js'

onMounted(() => {
  autofit.init(
    {
      el: '#app-main', // 默认是 "body" 支持所有 css 选择器 (推荐使用 id )
      dw: 1920,
      dh: 1080,
      resize: true, // 默认是 true 关闭后无法自动计算拖动后的大小
    },
    false // 默认是 false 检查autofit.js是否正在运行
  )
})
</script>

<template>
  <div id="app-main">
    <KtNav />
    <KtTimer />
    <router-view />
  </div>
</template>

<style scoped>
#app-main {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
style
