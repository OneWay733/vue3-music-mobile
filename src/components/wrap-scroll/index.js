import { computed, h, mergeProps, nextTick, ref, renderSlot, toRefs, watch, withCtx } from 'vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import { usePlaylistStore } from '@/stores/playlistStore'
export default {
  name: 'wrap-scroll',
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    return h(
      Scroll,
      mergeProps({ ref: 'scrollRef' }, ctx.$props, {
        onScroll: (e) => {
          ctx.$emit('scroll', e)
        }
      }),
      {
        default: withCtx(() => {
          return [renderSlot(ctx.$slots, 'default')]
        })
      }
    )
  },
  setup() {
    const store = usePlaylistStore()
    const { playlist } = toRefs(store)
    const scrollRef = ref(null)
    const scroll = computed(() => scrollRef.value.scroll)

    watch(playlist, async () => {
      await nextTick()
      scrollRef.value.scroll.refresh()
    })
    return {
      scrollRef,
      scroll
    }
  }
}
