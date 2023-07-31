<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImageStyle">
      <div class="play-btn-wrapper" :style="playBtnStyle">
        <div v-show="songs.length > 0" class="play-btn" @click="randomPlayAll">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="onScroll"
      v-loading:[loadingText]="loading"
      v-no-result="noResults"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script setup>
import Scroll from '@/components/wrap-scroll'
import SongList from '@/components/base/song-list/song-list.vue'
import { computed, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { usePlaylistStore } from '@/stores/playlistStore'

const store = usePlaylistStore()
const { playlist } = toRefs(store)

const props = defineProps({
  songs: {
    type: Array,
    default: () => []
  },
  title: String,
  pic: String,
  loading: Boolean,
  rank: Boolean
})

const bgImage = ref(null)
const imageHeight = ref(0)
const maxTranslateY = ref(0)

const bgImageStyle = computed(() => {
  const scroll_Y = scrollY.value
  const maxTranslateYVal = maxTranslateY.value
  const imageHeightVal = imageHeight.value
  let zIndex = 0
  let paddingTop = '70%'
  let height = 0
  let scale = 1

  if (scroll_Y > maxTranslateYVal) {
    zIndex = 10
    paddingTop = 0
    height = RESERVED_HEIGHT + 'px'
  }

  if (scroll_Y < 0) {
    scale = 1 + Math.abs(scroll_Y / imageHeightVal)
  }

  return {
    paddingTop,
    height,
    zIndex,
    backgroundImage: `url(${props.pic})`,
    transform: `scale(${scale})`
  }
})

const playBtnStyle = computed(() => {
  const scroll_Y = scrollY.value
  const maxTranslateYVal = maxTranslateY.value
  let show = ''
  if (scroll_Y >= maxTranslateYVal) {
    show = 'none'
  }
  return {
    display: `${show}`
  }
})

const filterStyle = computed(() => {
  let blur = 0
  const scroll_Y = scrollY.value
  const maxTranslateYVal = maxTranslateY.value

  if (scroll_Y <= maxTranslateYVal) {
    blur = (scroll_Y / maxTranslateYVal) * 10
  }

  return {
    backdropFilter: `blur(${blur}px)`
  }
})

const scrollStyle = computed(() => {
  const bottom = playlist.value.length ? '60px' : 0
  return {
    top: `${imageHeight.value}px`,
    bottom
  }
})
function calculateImageHeight() {
  imageHeight.value = bgImage.value.clientHeight
  maxTranslateY.value = imageHeight.value - RESERVED_HEIGHT
}

onMounted(() => {
  calculateImageHeight()
})

const loadingText = '等待加载...'

const noResults = computed(() => {
  return !props.loading && !props.songs.length
})

const router = useRouter()
function goBack() {
  router.back()
}

const scrollY = ref(0)
const RESERVED_HEIGHT = 40
function onScroll(pos) {
  scrollY.value = -pos.y
}

const playlistStore = usePlaylistStore()
function randomPlayAll() {
  playlistStore.randomPlay(props.songs)
}
</script>

<style scoped lang="scss">
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    top: calc(v-bind(imageHeight) * 1px);
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
