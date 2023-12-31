import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wrapperRef) {
  const slide = ref(null)
  const currentPageIndex = ref(0)
  onMounted(() => {
    slide.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    slide.value.on('slideWillChange', (page) => (currentPageIndex.value = page.pageX))
  })
  onUnmounted(() => {
    slide.value.destroy()
  })
  return {
    currentPageIndex
  }
}
