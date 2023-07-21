<template>
  <div class="singer" v-loading:[loadingText]="loading">
    <index-list :data="singerList" @select="select" />
    <router-view v-slot="{ Component }">
      <transition name="slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { getSingerList } from '@/service/singer'
import IndexList from '@/components/index-list/index-list.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'

const router = useRouter()

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

const selectedSinger = ref(null)
function select(singer) {
  selectedSinger.value = singer
  cacheSinger(singer)
  router.push(`/singer/${singer.mid}`)
}
function cacheSinger(singer) {
  storage.session.set(SINGER_KEY, singer)
}
</script>

<style scoped lang="scss">
.singer {
  position: fixed;
  width: 100%;
  bottom: 0;
  top: 88px;
}
</style>
