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
      <div class="bottom">
        <div class="operators">
          <div class="icon i-left">
            <i class="icon-sequence"></i>
          </div>
          <div class="icon i-left">
            <i @click="prev" class="icon-prev"></i>
          </div>
          <div class="icon i-center">
            <i @click="togglePlay" :class="playIcon"></i>
          </div>
          <div class="icon i-right">
            <i @click="next" class="icon-next"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-not-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @pause="pause"></audio>
  </div>
</template>

<script setup>
import { usePlaylistStore } from '@/stores/playlistStore'
import { computed, ref, toRefs, watch, watchEffect } from 'vue'

const playlistStore = usePlaylistStore()
const { currentSong, fullScreen, playing, currentIndex, playlist } = toRefs(playlistStore)
//播放状态
const playIcon = computed(() => {
  return playing.value ? 'icon-pause' : 'icon-play'
})
function togglePlay() {
  playlistStore.setPlayingState(!playing.value)
}
function pause() {
  playlistStore.setPlayingState(false)
}
watch(playing, (newPlaying) => {
  const audioEl = audioRef.value
  newPlaying ? audioEl.play() : audioEl.pause()
})

//切换歌曲
function prev() {
  let currentIndexVal = currentIndex.value
  const list = playlist.value
  if (!list.length) return
  if (list.length === 1) {
    loop()
  } else {
    currentIndexVal = currentIndexVal ? currentIndexVal - 1 : list.length - 1
    playlistStore.setCurrentIndex(currentIndexVal)
    playlistStore.setPlayingState(true)
  }
}
function next() {
  let currentIndexVal = currentIndex.value
  const list = playlist.value
  if (!list.length) return
  if (list.length === 1) {
    loop()
  } else {
    currentIndexVal = currentIndexVal === list - 1 ? 0 : currentIndexVal + 1
    playlistStore.setCurrentIndex(currentIndexVal)
    playlistStore.setPlayingState(true)
  }
}

function loop() {
  const audioEl = audioRef.value
  console.dir(audioEl.currentTime)
  // audioEl.currentTime = 0
}

// 播放歌曲
const audioRef = ref(null)
watchEffect(() => {
  const audioEl = audioRef.value
  if (!currentSong.value.id || !currentSong.value.url) return
  audioEl.src = currentSong.value.url
  audioEl.play()
})

//返回按钮
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
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
  }
}
</style>
