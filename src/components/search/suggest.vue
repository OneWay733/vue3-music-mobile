<template>
  <div
    ref="rootRef"
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id" @click="selectSong(song)">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[loadingText]="pullUpLoading"></div>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { search } from '@/service/search'
import { registerSongs } from '@/service/song'
import UsePullUpLoad from '@/components/search/use-pull-up-load'

const rootRef = ref(null)
const singer = ref(null)
const songs = ref([])
const hasMore = ref(true)
const page = ref(1)
const loadingText = ref('')
const noResultText = ref('抱歉，暂无搜索结果')

const props = defineProps({
  query: String,
  showSinger: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['select-singer', 'select-song'])

const { isPullUpLoad } = UsePullUpLoad(rootRef, searchMore)

const loading = computed(() => {
  return !singer.value && !songs.value.length
})
const noResult = computed(() => {
  return !singer.value && !songs.value.length && !hasMore.value
})
const pullUpLoading = computed(() => isPullUpLoad.value && hasMore.value)

watch(() => props.query, searchFirst)
async function searchFirst() {
  if (!props.query) return
  singer.value = null
  songs.value = []
  hasMore.value = true
  const { result } = await search(props.query, page.value, props.showSinger)
  songs.value = await registerSongs(result.songs)
  singer.value = result.singer
  hasMore.value = result.hasMore
}

async function searchMore() {
  if (!hasMore.value || !props.query) return
  page.value++
  const { result } = await search(props.query, page.value, props.showSinger)
  songs.value = songs.value.concat(await registerSongs(result.songs))
  hasMore.value = result.hasMore
}

function selectSinger(singer) {
  emits('select-singer', singer)
}
function selectSong(song) {
  emits('select-song', song)
}
</script>

<style scoped lang="scss">
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
