import { defineStore } from 'pinia'
import state from '@/stores/state'
import getters from '@/stores/getter'
import actions from '@/stores/action'

export const usePlaylistStore = defineStore('playlistStore', {
  state,
  getters,
  actions
})
