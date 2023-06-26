import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'

const actions = {
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
  }
}

export default actions
