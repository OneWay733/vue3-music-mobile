import { computed, nextTick, ref, watch } from 'vue'

export default function useFixed(props) {
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  const TITLE_HEIGHT = 30

  watch(
    () => props.data,
    async () => {
      await nextTick()
      await calculate()
    }
  )

  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length - 1; i++) {
      const top = listHeightsVal[i]
      const bottom = listHeightsVal[i + 1]
      if (newY >= top && newY <= bottom) {
        currentIndex.value = i
        distance.value = bottom - newY
      }
    }
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = distanceVal > 0 && distanceVal < TITLE_HEIGHT ? distanceVal - TITLE_HEIGHT : 0
    return {
      transform: `translateY(${diff}px)`
    }
  })

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return ''
    return props.data[currentIndex.value]?.title ?? ''
  })

  /**
   * 计算每个组别的高度，将每个组别的高度存到一个数组中
   * @returns {Promise<void>}
   */
  function calculate() {
    let height = 0
    const listHeightsVal = listHeights.value
    const list = groupRef.value.children

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  function onScroll(pos) {
    scrollY.value = -pos.y
  }
  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle,
    currentIndex
  }
}
