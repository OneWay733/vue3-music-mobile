<template>
  <m-header />
  <tab />
  <router-view :style="viewStyle" />
  <player />
</template>

<script setup>
import mHeader from '@/components/header/header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
import { usePlaylistStore } from '@/stores/playlistStore'
import { computed, toRefs } from 'vue'

const store = usePlaylistStore()
const { playlist } = toRefs(store)

const viewStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : 0
  return {
    bottom
  }
})
</script>
