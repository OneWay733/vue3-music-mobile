import Loading from '@/components/base/loading/loading.vue'
import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'

const RELATIVE_CLASS = 'g-relative'

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance
    const title = binding.arg
    if (title) {
      console.dir(instance)
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

function append(el) {
  const style = getComputedStyle(el)
  if (['absolute', 'relative', 'fixed'].indexOf(style.position) === -1) {
    addClass(el, RELATIVE_CLASS)
  }
  el.appendChild(el.instance.$el)
}

function remove(el) {
  removeClass(el, RELATIVE_CLASS)
  el.removeChild(el.instance.$el)
}
export default loadingDirective
