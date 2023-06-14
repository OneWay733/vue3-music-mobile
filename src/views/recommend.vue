<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <slider v-if="sliders.length" :sliders="sliders"></slider>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRecommend } from '@/service/recommend'
import Slider from '@/components/base/slider/slider.vue'

const sliders = ref([])
async function getRecommendList() {
  const { result } = await getRecommend()
  sliders.value = result.sliders
}
getRecommendList()
</script>

<style scoped lang="scss">
.recommend {
  .slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
}
</style>
