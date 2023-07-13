import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { computed, nextTick, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { usePlaylistStore } from '@/stores/playlistStore'

BScroll.use(Slide)
export default function useMiniSlider() {
  const store = usePlaylistStore()
  const { fullScreen, playlist, currentIndex } = toRefs(store)
  const sliderWrapperRef = ref(null)
  const slide = ref(null)

  const slideShow = computed(() => !fullScreen.value && playlist.value.length)

  onMounted(() => {
    let slideVal
    watch(slideShow, async (newSlideShow) => {
      if (newSlideShow) {
        await nextTick()
        if (!slideVal) {
          slideVal = slide.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollY: false,
            scrollX: true,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          })
        } else {
          slideVal.refresh()
        }
        slideVal.goToPage(currentIndex.value, 0, 0)
        slideVal.on('slidePageChanged', ({ pageX }) => {
          store.setCurrentIndex(pageX)
        })
      }
    })
    watch(currentIndex, (newIndex) => {
      if (slideVal && slideShow.value) {
        slideVal.goToPage(newIndex, 0, 0)
      }
    })
  })

  onUnmounted(() => {
    slide.value && slide.value.destroy()
  })
  return { slide, sliderWrapperRef }
}
