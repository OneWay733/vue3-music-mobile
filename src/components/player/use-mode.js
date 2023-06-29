import { usePlaylistStore } from '@/stores/playlistStore'
import { computed } from 'vue'
import { PLAY_MODE } from '@/assets/js/constant'

export default function useMode() {
  const store = usePlaylistStore()
  const modeIcon = computed(() => {
    return store.playMode === PLAY_MODE.sequence
      ? 'icon-sequence'
      : store.playMode === PLAY_MODE.random
      ? 'icon-random'
      : 'icon-loop'
  })

  function changeMode() {
    const mode = (store.playMode + 1) % 3
    store.changeMode(mode)
  }
  return {
    modeIcon,
    changeMode
  }
}
