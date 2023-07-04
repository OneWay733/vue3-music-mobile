<template>
  <div class="progress-bar" ref="progressBarRef" @click="onClick">
    <div class="bar-inner">
      <div class="progress" ref="progressRef" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="btnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['progress-changing', 'progress-changed'])

const progressBtnWidth = 16
const offset = ref(0)
const progressBarRef = ref(null)
const progressRef = ref(null)
const touch = {}

const progressStyle = computed(() => {
  return `width: ${offset.value}px`
})
const btnStyle = computed(() => {
  return `transform: translateX(${offset.value}px)`
})

watch(
  () => props.progress,
  (newProgress) => {
    setOffset(newProgress)
  }
)

function onTouchStart(e) {
  touch.x1 = e.touches[0].pageX
  touch.beginWidth = progressRef.value.clientWidth
}
function onTouchMove(e) {
  const delta = e.touches[0].pageX - touch.x1
  const tempWidth = touch.beginWidth + delta
  const barWidth = progressBarRef.value.clientWidth - progressBtnWidth
  const progress = Math.max(0, Math.min(tempWidth / barWidth, 1))
  offset.value = progress * barWidth
  emits('progress-changing', progress)
}
function onTouchEnd() {
  const barWidth = progressBarRef.value.clientWidth - progressBtnWidth
  const progress = progressRef.value.clientWidth / barWidth
  emits('progress-changed', progress)
}

function onClick(e) {
  const rect = progressBarRef.value.getBoundingClientRect()
  const offsetWidth = e.pageX - rect.left
  const barWidth = progressBarRef.value.clientWidth - progressBtnWidth
  const progress = offsetWidth / barWidth
  emits('progress-changed', progress)
}
function setOffset(progress) {
  const barWidth = progressBarRef.value.clientWidth - progressBtnWidth
  offset.value = barWidth * progress
}

defineExpose({
  setOffset
})
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
