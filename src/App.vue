<template>
  <m-header />
  <tab />
  <router-view />
  <player />
</template>

<script setup>
import mHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
</script>
