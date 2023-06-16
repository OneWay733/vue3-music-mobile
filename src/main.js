import { createApp } from 'vue'
import { createPinia } from 'pinia'
import lazyPlugin from 'vue3-lazy'
import lazyPic from '@/assets/images/default.png'
import loadingDirective from '@/components/base/loading/directive'
import '@/assets/css/index.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.directive('loading', loadingDirective)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin, {
  loading: lazyPic
})

app.mount('#app')
