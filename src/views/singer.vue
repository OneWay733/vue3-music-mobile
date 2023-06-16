<template>
  <div class="singer" v-loading:[loadingText]="loading">
    <index-list :data="singerList" />
  </div>
</template>

<script setup>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
import { computed, ref } from 'vue'

const loadingText = ref('等待加载 ...')
const loading = computed(() => {
  return !singerList.value.length
})

const singerList = ref([])
async function getSingers() {
  const {
    result: { singers }
  } = await getSingerList()
  singerList.value = singers
}
getSingers()
</script>

<style scoped lang="scss">
.singer {
  position: fixed;
  width: 100%;
  bottom: 0;
  top: 88px;
}
</style>
