<script setup>
import { xie_gang_zhu } from '@/echarts/home';
import { getDays } from '@/utils/num';

const data1 = ref(null);

onMounted(() => {
  data1.value = xie_gang_zhu({
    xData: getDays(7),
    data: [{ name: '', value: [7, 2, 9, 4, 6, 3, 10] }],
  });
});
</script>

<template>
  <kt-bottom style="grid-template-columns: 1fr 2fr 1fr 2fr">
    <div v-for="(item, index) in 4" :key="index">
      <kt-container title="生产机型数量">
        <kt-echart v-if="data1" :option="data1" />
      </kt-container>
    </div>
  </kt-bottom>
</template>

<style scoped></style>
