<script setup lang="ts">
import { sceneOnLoad,loadSceneByJSON } from '@/ktJS';

const sceneContainerRef = ref(null);

onMounted(() => {
  // sceneOnLoad({
  //   domElement: sceneContainerRef.value,
  //   callback: () => {
  //     //
  //   },
  // });

  loadSceneByJSON({
    domElement: sceneContainerRef.value,
    callback: () => {
      //
    },
  });
});
</script>

<template>
  <div class="scene">
    <canvas ref="sceneContainerRef" class="sceneContainer" />
  </div>
</template>

<style scoped>
.scene {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

canvas {
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 1;
  position: absolute;
}
</style>
