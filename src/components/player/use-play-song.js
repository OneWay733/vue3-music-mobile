import { computed, ref, toRefs, watch, watchEffect } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'

export default function usePlaySong() {
  const store = usePlaylistStore()
  const { currentSong, currentIndex, playlist, playing } = toRefs(store)
  const songReady = ref(false)
  const audioRef = ref(null)

  const playIcon = computed(() => {
    return playing.value ? 'icon-pause' : 'icon-play'
  })
  const disableCls = computed(() => {
    return songReady.value ? '' : 'disable'
  })

  watchEffect(() => {
    const audioEl = audioRef.value
    if (!currentSong.value.id || !currentSong.value.url) return
    songReady.value = false
    audioEl.src = currentSong.value.url
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
  }

  //解决切换歌曲太快导致的bug
  function ready() {
    if (songReady.value) return
    songReady.value = true
  }
  function error() {
    songReady.value = true
  }

  return {
    playIcon,
    disableCls,
    audioRef,
    songReady,
    togglePlay,
    pause,
    next,
    prev,
    ready,
    error
  }
}
