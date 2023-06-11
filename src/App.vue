<template>
  <div>
    <m-header />
    <tab />
    <router-view />
  </div>
</template>

<script setup>
import mHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
</script>

<style scoped lang="scss"></style>
