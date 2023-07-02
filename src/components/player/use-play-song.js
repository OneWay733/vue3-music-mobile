import { computed, ref, toRefs, watch, watchEffect } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'
import { PLAY_MODE } from '@/assets/js/constant'

export default function usePlaySong() {
  const store = usePlaylistStore()
  const { currentSong, currentIndex, playlist, playing, playMode } = toRefs(store)
  const songReady = ref(false)
  const audioRef = ref(null)
  const currentTime = ref(0)
  let progressChanging = false

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
    newPlaying ? audioEl.play() : audioEl.pause()
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
  }
  function error() {
    songReady.value = true
  }
  function updateTime(e) {
    if (progressChanging) return
    currentTime.value = e.target.currentTime
  }

  function onEnd() {
    if (playMode.value === PLAY_MODE.loop) {
      loop()
    } else {
      next()
    }
  }

  function onProgressChanging(progress) {
    currentTime.value = currentSong.value.duration * progress
    progressChanging = true
  }
  function onProgressChanged(progress) {
    audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress
    progressChanging = false
    if (!playing.value) {
      store.setPlayingState(true)
    }
  }

  return {
    playIcon,
    disableCls,
    audioRef,
    songReady,
    currentTime,
    togglePlay,
    pause,
    next,
    prev,
    ready,
    error,
    updateTime,
    onEnd,
    onProgressChanged,
    onProgressChanging
  }
}
