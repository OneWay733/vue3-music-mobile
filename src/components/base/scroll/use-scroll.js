import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)
BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true
    })

    if (options.probeType > 0) {
      scroll.value.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return scroll
}
