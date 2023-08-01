import storage from 'good-storage'
import MusicList from '@/components/music-list/music-list.vue'
import { registerSongs } from '@/service/song'

export default function createDetailComponent(key, fetch) {
  return {
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
          const cached = storage.session.get(key)
          if (cached && (cached.mid || cached.id + '') === this.$route.params.id) {
            ret = cached
          }
        }
        return ret
      },
      pic() {
        return this.computedData?.pic
      },
      title() {
        return this.computedData?.name || this.computedData?.title
      }
    },
    async created() {
      const data = this.computedData
      if (!data) {
        const path = this.$route.matched[0].path
        this.$router.push({ path })
        return
      }
      const { result } = await fetch(data)
      this.songs = await registerSongs(result.songs)
      this.loading = false
    }
  }
}
