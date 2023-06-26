<template>
  <div class="singer-detail">
    <music-list :songs="songs" :pic="pic" :title="title" :loading="loading" />
  </div>
</template>

<script setup>
import { getSingerDetail } from '@/service/singer'
import { registerSongs } from '@/service/song'
import MusicList from '@/components/music-list/music-list.vue'
import { computed, ref } from 'vue'
import storage from 'good-storage'
import { useRoute, useRouter } from 'vue-router'
import { SINGER_KEY } from '@/assets/js/constant'

const route = useRoute()
const router = useRouter()

const props = defineProps({
  singer: {
    type: Object,
    default: () => {}
  }
})
const computedSinger = computed(() => {
  let ret = null
  const singer = props.singer
  if (singer) {
    ret = singer
  } else {
    const cachedSinger = storage.session.get(SINGER_KEY)
    if (cachedSinger && cachedSinger.mid === route.params.id) {
      ret = cachedSinger
    }
  }
  return ret
})
const pic = computed(() => computedSinger.value && computedSinger.value.pic)
const title = computed(() => computedSinger.value && computedSinger.value.name)

const loading = ref(true)
const songs = ref([])
async function getSingersDetails() {
  if (!computedSinger.value) {
    const path = route.matched[0].path
    await router.push({ path })
    return
  }
  const { result } = await getSingerDetail(computedSinger.value)
  songs.value = await registerSongs(result.songs)
  loading.value = false
}
getSingersDetails()
</script>

<style scoped lang="scss">
.singer-detail {
  position: fixed;
  inset: 0;
  background: $color-background;
  z-index: 10;
}
</style>
