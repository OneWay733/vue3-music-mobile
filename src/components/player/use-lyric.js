import { usePlaylistStore } from '@/stores/playlistStore'
import { ref, toRefs, watch } from 'vue'
import { getLyric } from '@/service/song'
import Lyric from 'lyric-parser'

export default function useLyric({ songReady, currentTime }) {
  const store = usePlaylistStore()
  const { currentSong } = toRefs(store)

  const currentLyric = ref(null)
  const currentLineNum = ref(null)
  const lyricScrollRef = ref(null)
  const lyricListRef = ref(null)

  watch(currentSong, async (newSong) => {
    if (!newSong.url || !newSong.id) return
    stopLyric()
    currentLyric.value = null
    currentLineNum.value = 0
    const lyric = await getLyric(newSong)
    store.addSongLyric(newSong, lyric)
    // 切换歌曲比较快，解决歌词重复发送请求
    if (newSong.lyric !== lyric) return
    currentLyric.value = new Lyric(lyric, handleLyric)
    if (songReady.value) {
      playLyric()
    }
  })

  function playLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.seek(currentTime.value * 1000)
    }
  }

  function stopLyric() {
    const currentLyricVal = currentLyric.value
    if (currentLyricVal) {
      currentLyricVal.stop()
    }
  }

  function handleLyric({ lineNum }) {
    currentLineNum.value = lineNum
    const scrollComp = lyricScrollRef.value
    const listEl = lyricListRef.value
    if (!listEl) return
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5]
      scrollComp.scroll.scrollToElement(lineEl, 1000)
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000)
    }
  }
  return {
    currentLyric,
    currentLineNum,
    lyricScrollRef,
    lyricListRef,
    playLyric,
    stopLyric
  }
}
