<template>
  <div class="album">
    <music-list :songs="songs" :title="title" :pic="pic" :loading="loading"></music-list>
  </div>
</template>

<script>
// import createDetailComponent from '@/assets/js/create-detail-component'
import { ALBUM_KEY } from '@/assets/js/constant'
import { getAlbum } from '@/service/recommend'
import MusicList from '@/components/music-list/music-list.vue'
import storage from 'good-storage'
import { registerSongs } from '@/service/song'

// export default createDetailComponent(ALBUM_KEY, getAlbum)
export default {
  components: { MusicList },
  data() {
    return {
      loading: false,
      songs: []
    }
  },
  props: {
    data: Object
  },
  computed: {
    computedData() {
      let ret = null
      const data = this.data
      if (data) {
        ret = data
      } else {
        const cached = storage.session.get(ALBUM_KEY)
        if (cached && (cached.mid || cached.id + '') === this.$route.params.id) {
          ret = cached
        }
      }
      return ret
    },
    pic() {
      return this.computedData && this.computedData.pic
    },
    title() {
      return this.computedData && this.computedData.name
    }
  },
  created() {
    const data = this.computedData
    if (!data) {
      const path = this.$route.matched[0].path
      this.$router.push({ path })
      return
    }
    getAlbum(data)
    // this.songs = await registerSongs(result.songs)
    this.loading = false
  }
}
</script>

<style scoped lang="scss">
.album {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background;
}
</style>
