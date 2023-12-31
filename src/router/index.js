import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('@/views/recommend.vue'),
    children: [
      {
        path: ':id',
        name: 'album',
        component: () => import('@/views/album.vue')
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/views/singer.vue'),
    children: [
      {
        path: ':id',
        name: 'singerDetail',
        component: () => import('@/views/singer-detail.vue')
      }
    ]
  },
  {
    path: '/top-list',
    name: 'top-list',
    component: () => import('@/views/top-list.vue'),
    children: [
      {
        path: ':id',
        name: 'topDetail',
        component: () => import('@/views/top-detail.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
