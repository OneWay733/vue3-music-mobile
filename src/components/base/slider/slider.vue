<template>
  <div class="slider-wrapper" ref="sliderWrapperRef">
    <ul class="content">
      <li>...</li>
      <li>...</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useSlider from '@/components/base/slider/use-slider'
const sliderWrapperRef = ref(null)
useSlider(sliderWrapperRef)
</script>

<style scoped lang="scss">
.slider-wrapper {
}
</style>
