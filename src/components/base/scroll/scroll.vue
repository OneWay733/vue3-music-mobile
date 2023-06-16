<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script setup>
import useScroll from '@/components/base/scroll/use-scroll'
import { ref } from 'vue'

const rootRef = ref(null)
useScroll(rootRef, {
  click: true,
  probeType: 2,
  scrollY: true
})
</script>

<style scoped lang="scss"></style>
