import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const RELATIVE_CLASS = 'g-relative'

export default function createLoadingLikeDirective(Comp) {
  function append(el) {
    const name = Comp.__name
    const style = getComputedStyle(el)
    if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
      addClass(el, RELATIVE_CLASS)
    }
    el.appendChild(el[name].instance.$el)
  }

  function remove(el) {
    const name = Comp.__name
    removeClass(el, RELATIVE_CLASS)
    el.removeChild(el[name].instance.$el)
  }

  return {
    mounted(el, binding) {
      const name = Comp.__name
      const app = createApp(Comp)
      const instance = app.mount(document.createElement('div'))
      if (!el[name]) {
        el[name] = {}
      }
      el[name].instance = instance
      const title = binding.arg
      if (title) {
        instance.setTitle(title)
      }
      if (binding.value) {
        append(el)
      }
    },
    updated(el, binding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? append(el) : remove(el)
      }
    }
  }
}
