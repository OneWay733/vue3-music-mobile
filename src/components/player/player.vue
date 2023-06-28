<template>
  <div class="player">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" alt="" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
    </div>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup>
import { usePlaylistStore } from '@/stores/playlistStore'
import { ref, toRefs, watchEffect } from 'vue'

const playlistStore = usePlaylistStore()
const { currentSong, fullScreen } = toRefs(playlistStore)

const audioRef = ref(null)
watchEffect(() => {
  const audioEl = audioRef.value
  if (!currentSong.value.id || !currentSong.value.url) return
  audioEl.src = currentSong.value.url
  audioEl.play()
})
function goBack() {
  playlistStore.setFullScreen(false)
}
</script>

<style scoped lang="scss">
.player {
  .normal-player {
    position: fixed;
    inset: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(10px);
      & > img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
  }
}
</style>
