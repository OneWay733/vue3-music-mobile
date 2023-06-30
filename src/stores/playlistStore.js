import { defineStore } from 'pinia'
import { FAVORITE_KEY, PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'
import { load } from '@/assets/js/array-store'

export const usePlaylistStore = defineStore('playlistStore', {
  state: () => {
    return {
      sequenceList: [],
      playlist: [],
      playing: false,
      playMode: PLAY_MODE.sequence,
      currentIndex: 0,
      fullScreen: false,
      favoriteList: load(FAVORITE_KEY)
    }
  },
  getters: {
    currentSong(state) {
      return state.playlist[state.currentIndex] || {}
    }
  },
  actions: {
    setPlayingState(playing) {
      this.playing = playing
    },
    setSequenceList(list) {
      this.sequenceList = list
    },
    setPlayingList(list) {
      this.playlist = list
    },
    setPlayMode(mode) {
      this.playMode = mode
    },
    setCurrentIndex(index) {
      this.currentIndex = index
    },
    setFullScreen(fullScreen) {
      this.fullScreen = fullScreen
    },
    setFavoriteList(list) {
      this.favoriteList = list
    },
    selectPlay(list, index) {
      this.setPlayMode(PLAY_MODE.sequence)
      this.setSequenceList(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setPlayingList(list)
      this.setCurrentIndex(index)
    },
    randomPlay(list) {
      this.setPlayMode(PLAY_MODE.random)
      this.setSequenceList(list)
      this.setPlayingState(true)
      this.setFullScreen(true)
      this.setPlayingList(shuffle(list))
      this.setCurrentIndex(0)
    },
    changeMode(mode) {
      const id = this.currentSong.id
      if (mode === PLAY_MODE.random) {
        this.setPlayingList(shuffle(this.sequenceList))
      } else {
        this.setPlayingList(this.sequenceList)
      }
      const index = this.playlist.findIndex((song) => song.id === id)
      this.setCurrentIndex(index)
      this.setPlayMode(mode)
    }
  }
})
