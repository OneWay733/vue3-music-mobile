import { usePlaylistStore } from '@/stores/playlistStore'
import { toRefs, watch } from 'vue'
import { getLyric } from '@/service/song'

export default function useLyric() {
  const store = usePlaylistStore()
  const { currentSong } = toRefs(store)
  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) return
    if (!newSong.lyric) {
      const lyric = await getLyric(newSong)
      // newSong.lyric = lyric
      store.addSongLyric(newSong, lyric)
    }
  })
}
