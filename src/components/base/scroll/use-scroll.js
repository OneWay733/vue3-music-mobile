import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)
BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options) {
  const scroll = ref(null)
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      ...options,
      observeDOM: true
    })
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })
}
