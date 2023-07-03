import { computed, toRefs } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'

export default function useProgress({ currentTime, songReady }) {
  const store = usePlaylistStore()
  const { currentSong } = toRefs(store)

  const progress = computed(() => {
    if (songReady.value) {
      return currentTime.value / currentSong.value.duration
    }
    return 0
  })

  return {
    progress
  }
}
