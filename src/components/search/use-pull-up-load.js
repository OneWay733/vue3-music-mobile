import BScroll from '@better-scroll/core'
import PullUp from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(PullUp)
BScroll.use(ObserveDOM)
export default function UsePullUpLoad(scrollWrapper, fetchData) {
  const scroll = ref(null)
  const isPullUpLoad = ref(false)

  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(scrollWrapper.value, {
      pullUpLoad: true,
      ObserveDOM: true,
      click: true
    }))
    scrollVal.on('pullingUp', pullUpHandler)

    async function pullUpHandler() {
      isPullUpLoad.value = true
      await fetchData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  return {
    isPullUpLoad
  }
}
