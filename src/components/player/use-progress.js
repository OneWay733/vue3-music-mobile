import { computed, toRefs } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'

export default function useProgress(time) {
  const store = usePlaylistStore()
  const { currentSong } = toRefs(store)

  const progress = computed(() => {
    return time.value / currentSong.value.duration
  })

  return {
    progress
  }
}
