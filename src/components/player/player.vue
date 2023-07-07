<template>
  <div class="player" v-show="playlist.length">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
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
        <div
          class="middle"
          @touchstart.prevent="onMiddleTouchStart"
          @touchmove.prevent="onMiddleTouchMove"
          @touchend.prevent="onMiddleTouchEnd"
        >
          <div class="middle-l" :style="middleLStyle">
            <div ref="cdWrapperRef" class="cd-wrapper">
              <div ref="cdRef" class="cd">
                <img ref="cdImageRef" :class="cdCls" :src="currentSong.pic" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>

          <scroll class="middle-r" ref="lyricScrollRef" :style="middleRStyle">
            <div class="lyric-wrapper">
              <div v-if="currentLyric" ref="lyricListRef">
                <p
                  class="text"
                  :class="{ current: currentLineNum === index }"
                  v-for="(line, index) in currentLyric.lines"
                  :key="line.num"
                >
                  {{ line.txt }}
                </p>
              </div>
              <div class="pure-music" v-show="pureMusicLyric">
                <p>{{ pureMusicLyric }}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span class="dot" :class="{ active: currentShow === 'lyric' }"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ parseTime(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                ref="barRef"
                :progress="progress"
                @progress-changed="onProgressChanged"
                @progress-changing="onProgressChanging"
              ></progress-bar>
            </div>
            <span class="time time-r">{{ parseTime(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i @click="changeMode" :class="modeIcon"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlay" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i @click="toggleFavorite(currentSong)" :class="getFavoriteIcon(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <mini-player :progress="progress" :toggle-play="togglePlay" />
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="onEnd"
    ></audio>
  </div>
</template>

<script setup>
import { usePlaylistStore } from '@/stores/playlistStore'
import { computed, nextTick, ref, toRefs, watch } from 'vue'
import ProgressBar from '@/components/player/progress-bar.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import MiniPlayer from '@/components/player/mini-player.vue'
import useProgress from '@/components/player/use-progress'
import useMode from '@/components/player/use-mode'
import useFavorite from '@/components/player/use-favorite'
import UseMiddleInteractive from '@/components/player/use-middle-interactive'
import useCd from '@/components/player/use-cd'
import useLyric from '@/components/player/use-lyric'
import { parseTime } from '@/assets/js/utils'
import { PLAY_MODE } from '@/assets/js/constant'
import useAnimation from '@/components/player/use-animation'

const store = usePlaylistStore()
const { currentSong, fullScreen, playMode, currentIndex, playlist, playing } = toRefs(store)

const songReady = ref(false)
const audioRef = ref(null)
const currentTime = ref(0)
const barRef = ref(null)
let progressChanging = false

//播放模式切换
const { modeIcon, changeMode } = useMode()
//收藏歌曲
const { getFavoriteIcon, toggleFavorite } = useFavorite()
//进度条
const { progress } = useProgress({ currentTime, songReady })
// 旋转cd
const { cdCls, cdRef, cdImageRef } = useCd()
//歌词
const {
  currentLyric,
  pureMusicLyric,
  playingLyric,
  currentLineNum,
  lyricListRef,
  lyricScrollRef,
  playLyric,
  stopLyric
} = useLyric({
  songReady,
  currentTime
})
//中间切换层
const {
  currentShow,
  middleRStyle,
  middleLStyle,
  onMiddleTouchStart,
  onMiddleTouchMove,
  onMiddleTouchEnd
} = UseMiddleInteractive()
//动画效果
const { cdWrapperRef, enter, afterEnter, leave, afterLeave } = useAnimation()

const playIcon = computed(() => {
  return playing.value ? 'icon-pause' : 'icon-play'
})
const disableCls = computed(() => {
  return songReady.value ? '' : 'disable'
})

watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url) return
  songReady.value = false
  const audioEl = audioRef.value
  audioEl.src = newSong.url
  audioEl.play()
})

watch(playing, (newPlaying) => {
  if (!songReady.value) return
  const audioEl = audioRef.value
  if (newPlaying) {
    audioEl.play()
    playLyric()
  } else {
    audioEl.pause()
    stopLyric()
  }
})

watch(fullScreen, async (newFullScreen) => {
  if (newFullScreen) {
    await nextTick()
    barRef.value.setOffset(progress.value)
  }
})

function togglePlay() {
  if (!songReady.value) return
  store.setPlayingState(!playing.value)
}
function pause() {
  store.setPlayingState(false)
}

function prev() {
  let currentIndexVal = currentIndex.value
  const list = playlist.value
  if (!list.length || !songReady.value) return
  if (list.length === 1) {
    loop()
  } else {
    currentIndexVal = currentIndexVal ? currentIndexVal - 1 : list.length - 1
    store.setCurrentIndex(currentIndexVal)
    store.setPlayingState(true)
  }
}
function next() {
  let currentIndexVal = currentIndex.value
  const list = playlist.value
  if (!list.length || !songReady.value) return
  if (list.length === 1) {
    loop()
  } else {
    currentIndexVal = currentIndexVal === list.length - 1 ? 0 : currentIndexVal + 1
    store.setCurrentIndex(currentIndexVal)
    store.setPlayingState(true)
  }
}

function loop() {
  const audioEl = audioRef.value
  audioEl.currentTime = 0
  audioEl.play()
  store.setPlayingState(true)
}
//解决切换歌曲太快导致的bug
function ready() {
  if (songReady.value) return
  songReady.value = true
  playLyric()
}
function error() {
  songReady.value = true
}
function updateTime(e) {
  if (!progressChanging && songReady.value) {
    currentTime.value = e.target.currentTime
  }
}

function onEnd() {
  if (playMode.value === PLAY_MODE.loop) {
    loop()
  } else {
    next()
  }
}

function onProgressChanging(progress) {
  progressChanging = true
  currentTime.value = currentSong.value.duration * progress
  playLyric()
  stopLyric()
}
function onProgressChanged(progress) {
  audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
  progressChanging = false
  if (!playing.value) {
    store.setPlayingState(true)
  }
  playLyric()
}

//返回按钮
function goBack() {
  store.setFullScreen(false)
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
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
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
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
