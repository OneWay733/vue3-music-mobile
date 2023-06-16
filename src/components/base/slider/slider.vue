<template>
  <div class="slider" ref="sliderWrapperRef">
    <div class="slider-group">
      <div class="slider-page" v-for="slider in sliders" :key="slider.id">
        <a :href="slider.link">
          <img :src="slider.pic" alt="" />
        </a>
      </div>
    </div>
  </div>
  <div class="dots-wrapper">
    <span
      class="dot"
      v-for="(item, index) in sliders"
      :key="item.id"
      :class="{ active: currentPageIndex === index }"
    >
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useSlider from '@/components/base/slider/use-slider'

defineProps({
  sliders: {
    type: Array,
    default() {
      return []
    }
  }
})
const sliderWrapperRef = ref(null)
const { currentPageIndex } = useSlider(sliderWrapperRef)
</script>

<style scoped lang="scss">
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a,
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
.dots-wrapper {
  position: absolute;
  left: 50%;
  bottom: 12px;
  line-height: 12px;
  transform: translateX(-50%);
  .dot {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    transform: translateZ(1px);
    border-radius: 50%;
    background: $color-text-l;
    &.active {
      width: 20px;
      border-radius: 5px;
      background: $color-text-ll;
    }
  }
}
</style>
