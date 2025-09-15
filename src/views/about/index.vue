<script setup>
import KtLeft from '@/components/kt-ui/kt-left.vue';
import KtRight from '@/components/kt-ui/kt-right.vue';
import KtContainer from '@/components/my-ui/kt-container.vue';
import KtEchart from '@/components/utils-ui/kt-echart.vue';
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
  <KtLeft style="grid-template-rows: 1fr 2fr 1fr 2fr">
    <div v-for="(item, index) in 4" :key="index">
      <KtContainer title="About">
        <KtEchart v-if="data1" :option="data1" />
      </KtContainer>
    </div>
  </KtLeft>
  <KtRight style="grid-template-rows: 1fr 2fr 1fr 2fr">
    <div v-for="(item, index) in 4" :key="index">
      <KtContainer title="About">
        <KtEchart v-if="data1" :option="data1" />
      </KtContainer>
    </div>
  </KtRight>
</template>

<style scoped>
.activePerson {
  background: rgba(0, 163, 255, 0.46);
  border-right: 2px solid rgba(0, 163, 255, 1);
  border-left: 2px solid rgba(0, 163, 255, 1);
}
</style>
