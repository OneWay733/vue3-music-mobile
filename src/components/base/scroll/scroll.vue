<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import useScroll from '@/components/base/scroll/use-scroll'
import { ref } from 'vue'

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['onScroll'])

const rootRef = ref(null)
const scroll = useScroll(rootRef, props, emit)

defineExpose({ scroll })
</script>

<style scoped lang="scss"></style>
