import { computed, ref, toRefs, watch } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'

export default function useCd() {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const { playing } = toRefs(usePlaylistStore())

  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform(wrapper, inner) {
    const innerTransform = getComputedStyle(inner).transform
    const wrapperTransform = getComputedStyle(wrapper).transform

    wrapper.style.transform =
      wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}
